import { Injectable } from '@nestjs/common';
import { IClientRepository } from '../../domain/i-repository/i-client.repository';
import { RegisterClientCommand } from './commands/register-client.command';
import { NewClientCreator } from '../../domain/factory/new-client-creator';

@Injectable()
export class RegisterClientUseCase {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly newClientCreator: NewClientCreator,
  ) {}

  async handle(command: RegisterClientCommand) {
    const client = await this.newClientCreator.handle(command.ipAddress);
    await this.clientRepository.save(client);
  }
}
