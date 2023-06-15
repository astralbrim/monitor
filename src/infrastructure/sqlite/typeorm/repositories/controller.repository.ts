import { Injectable } from '@nestjs/common';
import { IControllerRepository } from '../../../../domain/i-repository/i-controller.repository';
import { Controller } from '../../../../domain/domain-object/entity/controller';
import { Controller as ControllerRepositoryEntity } from '../entities/controller.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPAddress } from '../../../../domain/domain-object/value-object/ip-address';

@Injectable()
export class ControllerRepository implements IControllerRepository {
  constructor(
    @InjectRepository(ControllerRepositoryEntity)
    private controllerRepository: Repository<ControllerRepositoryEntity>,
  ) {}

  async getAll(): Promise<Controller[]> {
    const controllers = await this.controllerRepository.find({
      relations: {
        node: true,
      },
    });
    return controllers.map((controller) => {
      return new Controller(
        controller.id,
        new IPAddress(controller.ipAddress),
        controller.status,
        !!controller.node,
      );
    });
  }

  async findOneById(id: number): Promise<Controller | null> {
    const controller = await this.controllerRepository.findOneBy({ id });
    if (!controller) return null;
    return new Controller(
      controller.id,
      new IPAddress(controller.ipAddress),
      controller.status,
      !!controller.node,
    );
  }

  async deleteOne(id: number): Promise<void> {
    await this.controllerRepository.delete(id);
  }

  async updateOne(controller: Controller): Promise<void> {
    const current = await this.findOneById(controller.id);
    current.updateStatus(controller.status);
    current.updateIsBelongNode(current.isBelongNode);
    await this.save(current);
  }

  async save(controller: Controller): Promise<void> {
    await this.controllerRepository.save({
      id: controller.id,
      ipAddress: controller.ipAddress.value,
      status: controller.status,
    });
  }

  async getNextId(): Promise<number> {
    const { maximumId } = (await this.controllerRepository
      .createQueryBuilder()
      .select('MAX(controller.id)', 'maximumId')
      .getRawOne()) as { maximumId: number };

    return maximumId + 1;
  }
}
