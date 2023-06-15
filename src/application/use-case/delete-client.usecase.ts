import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../../domain/i-repository/i-client.repository';

@Injectable()
export class DeleteClientUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async handle(id: number) {
    await this.clientRepository.deleteOne(id);
  }
}
