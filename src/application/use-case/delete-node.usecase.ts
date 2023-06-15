import { Injectable } from '@nestjs/common';
import { INodeRepository } from '../../domain/i-repository/i-node.repository';

@Injectable()
export class DeleteNodeUseCase {
  constructor(private readonly nodeRepository: INodeRepository) {}
  async handle(id: number): Promise<void> {
    await this.nodeRepository.deleteOne(id);
  }
}
