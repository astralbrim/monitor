import { Injectable } from '@nestjs/common';
import { IControllerRepository } from '../../domain/i-repository/i-controller.repository';

@Injectable()
export class GetAllControllersUseCase {
  constructor(private readonly controllerRepository: IControllerRepository) {}

  async handle() {
    return await this.controllerRepository.getAll();
  }
}
