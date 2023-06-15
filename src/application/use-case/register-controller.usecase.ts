import { RegisterControllerCommand } from './commands/register-controller.command';
import { NewControllerCreator } from '../../domain/factory/new-controller-creator';
import { Injectable } from '@nestjs/common';
import { IControllerRepository } from '../../domain/i-repository/i-controller.repository';

@Injectable()
export class RegisterControllerUseCase {
  constructor(
    private readonly controllerRepository: IControllerRepository,
    private readonly newControllerCreator: NewControllerCreator,
  ) {}

  async handle(
    registerControllerCommand: RegisterControllerCommand,
  ): Promise<void> {
    const { ipAddress } = registerControllerCommand;
    const controller = await this.newControllerCreator.handle(ipAddress);
    await this.controllerRepository.save(controller);
  }
}
