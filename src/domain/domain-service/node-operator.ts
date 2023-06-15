import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { INodeRepository } from '../i-repository/i-node.repository';

import { Esp32Service } from './esp32.service';
import { NetWorkError } from '../../exception';
import { CanOperate } from '../../utils/can-operate';
import { ControllerOperator } from './controller-operator';
import { ClientStatus } from '../domain-object/value-object/status';

@Injectable()
export class NodeOperator {
  constructor(
    private readonly nodeRepository: INodeRepository,
    private readonly esp32Service: Esp32Service,
    private readonly controllerOperator: ControllerOperator,
  ) {}
  private readonly loggerService = new Logger('NodeOperator');
  async reboot(id: number): Promise<void> {
    const node = await this.nodeRepository.findOneById(id);
    if (!node) throw new NotFoundException();
    if (!CanOperate.reboot(node)) return;
    await this.controllerOperator.reboot(node.controller.id);
  }
  async rebootAll(): Promise<void> {
    this.loggerService.log('全機が再起動されます');
    const nodes = await this.nodeRepository.getAll();
    nodes.filter((node) => {
      return CanOperate.reboot(node);
    });
    const promises = nodes.map((node) => {
      return new Promise((resolve, reject) => {
        this.esp32Service
          .reboot(node.controller.ipAddress.value)
          .then((value) => {
            this.loggerService.log('再起動されました');
            resolve(value);
          })
          .catch((reason) => {
            reject(reason);
          });
      });
    });
    await Promise.all(promises)
      .then(() => {
        this.loggerService.log('全機が再起動されました');
      })
      .catch((_reason) => {
        this.loggerService.error('通信エラーにより、再起動されませんでした');
        throw new NetWorkError();
      });
  }

  async shutdown(id: number): Promise<void> {
    const node = await this.nodeRepository.findOneById(id);
    if (!node) throw new NotFoundException();
    if (!CanOperate.shutdown(node)) return;
    this.loggerService.log(`id: ${id}, ${node.name} をシャットダウンします`);
    await this.controllerOperator.shutdown(node.controller.id);
    node.client.updateStatus(ClientStatus.MAINTENANCE);
    await this.nodeRepository.save(node);
  }

  async boot(id: number): Promise<void> {
    this.loggerService.log(`id: ${id} は起動されます`);
    const node = await this.nodeRepository.findOneById(id);
    if (!node) throw new NotFoundException();
    console.log(CanOperate.boot(node));
    if (!CanOperate.boot(node)) return;
    await this.controllerOperator.boot(node.controller.id);
    node.client.updateStatus(ClientStatus.OK);
    await this.nodeRepository.save(node);
  }
}
