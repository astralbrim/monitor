import { Injectable } from '@nestjs/common';
import { Controller } from '../domain-object/entity/controller';
import { IPAddress } from '../domain-object/value-object/ip-address';
import { ControllerStatus } from '../domain-object/value-object/status';
import { IControllerRepository } from '../i-repository/i-controller.repository';

@Injectable()
export class NewControllerCreator {
  constructor(private readonly controllerRepository: IControllerRepository) {}
  async handle(ipAddress: string) {
    const id = await this.controllerRepository.getNextId();
    return new Controller(
      id,
      new IPAddress(ipAddress),
      ControllerStatus.OK,
      false,
    );
  }
}
