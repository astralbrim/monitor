import { Injectable } from '@nestjs/common';
import { INodeRepository } from '../../../../domain/i-repository/i-node.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Node } from '../../../../domain/domain-object/entity/node';
import { Repository } from 'typeorm';
import { Node as NodeRepositoryEntity } from '../entities/node.entity';
import { Client as ClientRepositoryEntity } from '../entities/client.entity';
import { Controller as ControllerRepositoryEntity } from '../entities/controller.entity';
import { IPAddress } from '../../../../domain/domain-object/value-object/ip-address';
import { NodeName } from '../../../../domain/domain-object/value-object/node-name';
import { Controller } from '../../../../domain/domain-object/entity/controller';
import { Client } from '../../../../domain/domain-object/entity/client';

@Injectable()
export class NodeRepository implements INodeRepository {
  constructor(
    @InjectRepository(NodeRepositoryEntity)
    private nodeRepository: Repository<NodeRepositoryEntity>,
    @InjectRepository(ClientRepositoryEntity)
    private clientRepository: Repository<ClientRepositoryEntity>,
    @InjectRepository(ControllerRepositoryEntity)
    private controllerRepository: Repository<ControllerRepositoryEntity>,
  ) {}

  async getAll(): Promise<Node[]> {
    const nodeDats = await this.nodeRepository.find({
      relations: {
        controller: true,
        client: true,
      },
    });
    return nodeDats.map(({ id, name, client, controller }) => {
      return new Node(
        id,
        new NodeName(name),
        new Controller(
          controller.id,
          new IPAddress(controller.ipAddress),
          controller.status,
          true,
        ),
        new Client(
          client.id,
          new IPAddress(client.ipAddress),
          client.status,
          true,
        ),
      );
    });
  }

  async save(node: Node): Promise<void> {
    const client = ClientRepositoryEntity.create(
      node.client.id,
      node.client.ipAddress.value,
      node.client.status,
    );
    const controller = ControllerRepositoryEntity.create(
      node.controller.id,
      node.controller.ipAddress.value,
      node.controller.status,
    );
    const newNode = NodeRepositoryEntity.create(node.id, node.name.value);
    newNode.client = client;
    newNode.controller = controller;
    await this.nodeRepository.save(newNode);
  }

  async updateOne(node: Node): Promise<void> {
    const nodeData = await this.nodeRepository.findOneBy({ id: node.id });
    nodeData.id = node.id;
    nodeData.name = node.name.value;
    nodeData.client = ClientRepositoryEntity.create(
      node.client.id,
      node.client.ipAddress.value,
      node.client.status,
    );
    nodeData.controller = ControllerRepositoryEntity.create(
      node.controller.id,
      node.controller.ipAddress.value,
      node.controller.status,
    );
    await this.nodeRepository.save(nodeData);
  }

  async deleteOne(id: number): Promise<void> {
    await this.nodeRepository.delete(id);
  }

  async findOneById(id: number): Promise<Node | null> {
    const nodeData = await this.nodeRepository.findOne({
      relations: { controller: true, client: true },
      where: { id },
    });
    if (!nodeData) return null;
    return new Node(
      nodeData.id,
      new NodeName(nodeData.name),
      new Controller(
        nodeData.controller.id,
        new IPAddress(nodeData.controller.ipAddress),
        nodeData.controller.status,
        !!nodeData.controller.node,
      ),
      new Client(
        nodeData.client.id,
        new IPAddress(nodeData.client.ipAddress),
        nodeData.client.status,
        !!nodeData.client.node,
      ),
    );
  }
  async getNextId(): Promise<number> {
    const { maximumId } = (await this.nodeRepository
      .createQueryBuilder()
      .select('MAX(node.id)', 'maximumId')
      .getRawOne()) as { maximumId: number };

    return maximumId + 1;
  }
}
