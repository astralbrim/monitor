import { OperateNodeCommand } from './commands/operate-node.command';
import { Injectable } from '@nestjs/common';
import { NodeOperator } from '../../domain/domain-service/node-operator';

@Injectable()
export class ShutdownNodeUseCase {
  constructor(private readonly nodeOperator: NodeOperator) {}
  async handle(operateNodeCommand: OperateNodeCommand): Promise<void> {
    await this.nodeOperator.shutdown(operateNodeCommand.id);
  }
}
