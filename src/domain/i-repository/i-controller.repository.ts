import { Controller } from '../domain-object/entity/controller';

export abstract class IControllerRepository {
  abstract getAll(): Promise<Controller[]>;
  abstract save(controller: Controller): Promise<void>;
  abstract updateOne(controller: Controller): Promise<void>;
  abstract deleteOne(id: number): Promise<void>;
  abstract findOneById(id: number): Promise<Controller | null>;
  abstract getNextId(): Promise<number>;
}
