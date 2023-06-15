import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../../domain/i-repository/i-client.repository';

@Injectable()
export class GetAllClientsUseCase {
  constructor(private readonly clientRepository: IClientRepository) {}

  async handle() {
    return await this.clientRepository.getAll();
  }
}
