import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../../../../domain/i-repository/i-client.repository';
import { Client } from '../../../../domain/domain-object/entity/client';
import { Client as ClientRepositoryEntity } from '../entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPAddress } from '../../../../domain/domain-object/value-object/ip-address';

@Injectable()
export class ClientRepository implements IClientRepository {
  constructor(
    @InjectRepository(ClientRepositoryEntity)
    private clientRepository: Repository<ClientRepositoryEntity>,
  ) {}

  async getAll(): Promise<Client[]> {
    const controllers = await this.clientRepository.find({
      relations: {
        node: true,
      },
    });
    return controllers.map((controller) => {
      return new Client(
        controller.id,
        new IPAddress(controller.ipAddress),
        controller.status,
        !!controller.node,
      );
    });
  }

  async findOneById(id: number): Promise<Client | null> {
    const controller = await this.clientRepository.findOneBy({ id });
    if (!controller) return null;
    return new Client(
      controller.id,
      new IPAddress(controller.ipAddress),
      controller.status,
      !!controller.node,
    );
  }

  async deleteOne(id: number): Promise<void> {
    await this.clientRepository.delete(id);
  }

  async updateOne(client: Client): Promise<void> {
    const current = await this.findOneById(client.id);
    current.updateIsBelongNode(client.isBelongNode);
    current.updateStatus(client.status);
    await this.save(current);
  }

  async save(client: Client): Promise<void> {
    await this.clientRepository.save({
      id: client.id,
      ipAddress: client.ipAddress.value,
      status: client.status,
    });
  }

  async getNextId(): Promise<number> {
    const { maximumId } = (await this.clientRepository
      .createQueryBuilder()
      .select('MAX(client.id)', 'maximumId')
      .getRawOne()) as { maximumId: number };

    return maximumId + 1;
  }
}
