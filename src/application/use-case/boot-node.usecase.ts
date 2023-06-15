import { OperateNodeCommand } from './commands/operate-node.command';
import { NodeOperator } from '../../domain/domain-service/node-operator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BootNodeUseCase {
  constructor(private readonly nodeOperator: NodeOperator) {}
  async handle(operateNodeCommand: OperateNodeCommand): Promise<void> {
    await this.nodeOperator.boot(operateNodeCommand.id);
  }
}
