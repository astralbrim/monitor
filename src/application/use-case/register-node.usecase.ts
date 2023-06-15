import { Injectable } from '@nestjs/common';
import { RegisterNodeCommand } from './commands/register-node..command';
import { NewNodeCreator } from '../../domain/factory/new-node-creator';
import { INodeRepository } from '../../domain/i-repository/i-node.repository';
import { IClientRepository } from '../../domain/i-repository/i-client.repository';
import { IControllerRepository } from '../../domain/i-repository/i-controller.repository';

@Injectable()
export class RegisterNodeUseCase {
  constructor(
    private readonly newNodeCreator: NewNodeCreator,
    private readonly clientRepository: IClientRepository,
    private readonly controllerRepository: IControllerRepository,
    private readonly nodeRepository: INodeRepository,
  ) {}

  async handle(registerNodeCommand: RegisterNodeCommand): Promise<void> {
    const node = await this.newNodeCreator.handle(
      registerNodeCommand.name,
      registerNodeCommand.controllerId,
      registerNodeCommand.clientId,
    );
    const client = await this.clientRepository.findOneById(
      registerNodeCommand.clientId,
    );
    client.updateIsBelongNode(true);
    const controller = await this.controllerRepository.findOneById(
      registerNodeCommand.controllerId,
    );
    controller.updateIsBelongNode(true);
    await this.nodeRepository.save(node);
  }
}
