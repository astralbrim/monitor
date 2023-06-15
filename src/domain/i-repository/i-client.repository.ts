import { Client } from '../domain-object/entity/client';

export abstract class IClientRepository {
  abstract getAll(): Promise<Client[]>;
  abstract save(client: Client): Promise<void>;
  abstract updateOne(client: Client): Promise<void>;
  abstract deleteOne(id: number): Promise<void>;
  abstract findOneById(id: number): Promise<Client | null>;
  abstract getNextId(): Promise<number>;
}
