import { Injectable } from '@nestjs/common';
import { NodeOperator } from '../../domain/domain-service/node-operator';

@Injectable()
export class RebootAllUseCase {
  constructor(private readonly nodeOperator: NodeOperator) {}

  async handle(): Promise<void> {
    await this.nodeOperator.rebootAll();
  }
}
