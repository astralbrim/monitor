import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../i-repository/i-client.repository';
import { Client } from '../domain-object/entity/client';
import { ClientStatus } from '../domain-object/value-object/status';
import { IPAddress } from '../domain-object/value-object/ip-address';

@Injectable()
export class NewClientCreator {
  constructor(private readonly clientRepository: IClientRepository) {}

  async handle(ipAddress: string) {
    const id = await this.clientRepository.getNextId();
    return new Client(id, new IPAddress(ipAddress), ClientStatus.ERROR, false);
  }
}
