import { Cron, CronExpression } from '@nestjs/schedule';
import { INodeRepository } from '../../domain/i-repository/i-node.repository';
import { Injectable, Logger } from '@nestjs/common';
import { StatusChecker } from '../../domain/domain-service/status-checker';
import { NodeOperator } from '../../domain/domain-service/node-operator';
import {
  ClientStatus,
  ControllerStatus,
} from '../../domain/domain-object/value-object/status';
import { IClientRepository } from '../../domain/i-repository/i-client.repository';
import { IControllerRepository } from '../../domain/i-repository/i-controller.repository';

@Injectable()
export class Scheduler {
  constructor(
    private readonly nodeRepository: INodeRepository,
    private readonly clientRepository: IClientRepository,
    private readonly controllerRepository: IControllerRepository,
    private readonly statusChecker: StatusChecker,
    private readonly nodeOperator: NodeOperator,
  ) {}
  private readonly logger = new Logger('Scheduler');

  @Cron(CronExpression.EVERY_MINUTE)
  async checkNodeStatus() {
    const controllers = await this.controllerRepository.getAll();
    const clients = await this.clientRepository.getAll();
    for (const controller of controllers) {
      this.logger.log(`controllerId:${controller.id} のステータスチェック`);
      const controllerIsAlive = await this.statusChecker.handleController(
        controller.id,
      );
      this.logger.log(
        `controllerId: ${controller.id} マイコンは ${
          controllerIsAlive ? '正常' : '異常'
        }です`,
      );
      if (controllerIsAlive) {
        controller.updateStatus(ControllerStatus.OK);
      } else {
        controller.updateStatus(ControllerStatus.ERROR);
      }
      await this.controllerRepository.save(controller);
    }
    for (const client of clients) {
      if (client.status == ClientStatus.MAINTENANCE) {
        this.logger.log(`clientId: ${client.id} はメンテナンス中です`);
        continue;
      }
      const clientIsAlive = await this.statusChecker.handleClient(client.id);
      this.logger.log(
        `clientId: ${client.id} PCは ${clientIsAlive ? '正常' : '異常'}です`,
      );
      if (clientIsAlive) {
        client.updateStatus(ClientStatus.OK);
      } else {
        client.updateStatus(ClientStatus.ERROR);
      }
      await this.clientRepository.save(client);
    }
    const nodes = await this.nodeRepository.getAll();
    for (const node of nodes) {
      if (node.client.status == ClientStatus.ERROR) {
        this.logger.log('PCがフリーズしているため、再起動します');
        await this.nodeOperator.reboot(node.id);
      }
    }
  }
}
