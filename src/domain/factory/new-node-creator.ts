import { Injectable } from '@nestjs/common';
import { INodeRepository } from '../i-repository/i-node.repository';
import { Node } from '../domain-object/entity/node';
import { IPAddress } from '../domain-object/value-object/ip-address';

import { NodeName } from '../domain-object/value-object/node-name';
import { Controller } from '../domain-object/entity/controller';
import { IControllerRepository } from '../i-repository/i-controller.repository';
import { IClientRepository } from '../i-repository/i-client.repository';
import { Client } from '../domain-object/entity/client';

@Injectable()
export class NewNodeCreator {
  constructor(
    private readonly nodeRepository: INodeRepository,
    private readonly controllerRepository: IControllerRepository,
    private readonly clientRepository: IClientRepository,
  ) {}

  async handle(
    name: string,
    controllerId: number,
    clientId: number,
  ): Promise<Node> {
    const nodeId = await this.nodeRepository.getNextId();
    const client = await this.clientRepository.findOneById(clientId);
    const controller = await this.controllerRepository.findOneById(
      controllerId,
    );
    return new Node(
      nodeId,
      new NodeName(name),
      new Controller(
        controller.id,
        new IPAddress(controller.ipAddress.value),
        controller.status,
        true,
      ),
      new Client(
        client.id,
        new IPAddress(client.ipAddress.value),
        client.status,
        true,
      ),
    );
  }
}
