import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Esp32Service } from './esp32.service';
import { NetWorkError } from '../../exception';
import { IControllerRepository } from '../i-repository/i-controller.repository';

@Injectable()
export class ControllerOperator {
  constructor(
    private readonly controllerRepository: IControllerRepository,
    private readonly esp32Service: Esp32Service,
  ) {}
  private readonly logger = new Logger('Controller Operator');
  async check(id: number) {
    const controller = await this.controllerRepository.findOneById(id);
    if (!controller) throw new NotFoundException();
    await this.esp32Service.check(controller.ipAddress.value).catch(() => {
      this.logger.error('通信エラーにより、接続できませんでした');
      throw new NetWorkError();
    });
  }
  async boot(id: number) {
    const controller = await this.controllerRepository.findOneById(id);
    if (!controller) throw new NotFoundException();
    await this.esp32Service
      .boot(controller.ipAddress.value)
      .then(async () => {
        this.logger.log('起動されました');
      })
      .catch(() => {
        this.logger.error('通信エラーにより、起動できませんでした');
        throw new NetWorkError();
      });
  }
  async reboot(id: number) {
    this.logger.log(`id: ${id} は再起動されます`);
    const controller = await this.controllerRepository.findOneById(id);
    if (!controller) throw new NotFoundException();
    await this.esp32Service
      .reboot(controller.ipAddress.value)
      .then(async () => {
        this.logger.log('再起動されました');
      })
      .catch(() => {
        this.logger.error('通信エラーにより、再起動されませんでした');
        throw new NetWorkError();
      });
  }
  async shutdown(id: number) {
    const controller = await this.controllerRepository.findOneById(id);
    if (!controller) throw new NotFoundException();
    await this.esp32Service
      .shutdown(controller.ipAddress.value)
      .then(async () => {
        this.logger.log('シャットダウンされ、メンテナンスモードに入りました');
      })
      .catch(() => {
        this.logger.error('通信エラーにより、シャットダウンされませんでした');
        throw new NetWorkError();
      });
  }
}
