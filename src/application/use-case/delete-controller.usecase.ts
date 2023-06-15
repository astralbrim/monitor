import { Injectable } from '@nestjs/common';
import { IControllerRepository } from '../../domain/i-repository/i-controller.repository';

@Injectable()
export class DeleteControllerUseCase {
  constructor(private readonly controllerRepository: IControllerRepository) {}

  async handle(id: number) {
    await this.controllerRepository.deleteOne(id);
  }
}
