import { Node } from '../domain-object/entity/node';

export abstract class INodeRepository {
  abstract getAll(): Promise<Node[]>;
  abstract save(node: Node): Promise<void>;
  abstract updateOne(node: Node): Promise<void>;
  abstract deleteOne(id: number): Promise<void>;
  abstract findOneById(id: number): Promise<Node | null>;
  abstract getNextId(): Promise<number>;
}
