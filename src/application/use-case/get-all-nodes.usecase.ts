import { Injectable } from '@nestjs/common';
import { INodeRepository } from '../../domain/i-repository/i-node.repository';
import { Node } from '../../domain/domain-object/entity/node';

@Injectable()
export class GetAllNodesUseCase {
  constructor(private readonly nodeRepository: INodeRepository) {}

  async handle(): Promise<Node[]> {
    return this.nodeRepository.getAll();
  }
}
