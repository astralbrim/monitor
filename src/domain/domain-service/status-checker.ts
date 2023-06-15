import { Injectable } from '@nestjs/common';
import { promise } from 'ping';
import { IClientRepository } from '../i-repository/i-client.repository';
import { IControllerRepository } from '../i-repository/i-controller.repository';

@Injectable()
export class StatusChecker {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly controllerRepository: IControllerRepository,
  ) {}

  async handleClient(id: number): Promise<boolean> {
    const client = await this.clientRepository.findOneById(id);
    const res = await promise.probe(client.ipAddress.value);
    return res.alive;
  }

  async handleController(id: number): Promise<boolean> {
    const controller = await this.controllerRepository.findOneById(id);
    const res = await promise.probe(controller.ipAddress.value);
    return res.alive;
  }
}
