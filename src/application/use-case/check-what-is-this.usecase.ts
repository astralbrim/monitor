import { Injectable } from '@nestjs/common';
import { ControllerOperator } from '../../domain/domain-service/controller-operator';

@Injectable()
export class CheckWhatIsThisUseCase {
  constructor(private readonly controllerOperator: ControllerOperator) {}

  async handle(id: number): Promise<void> {
    await this.controllerOperator.check(id);
  }
}
