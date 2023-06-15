import { Client } from './client';
import { Controller } from './controller';
import { NodeName } from '../value-object/node-name';

export class Node {
  constructor(
    private _id: number,
    private _name: NodeName,
    private _controller: Controller,
    private _client: Client,
  ) {}

  get id(): number {
    return this._id;
  }

  get name(): NodeName {
    return this._name;
  }

  get controller(): Controller {
    return this._controller;
  }

  get client(): Client {
    return this._client;
  }
}
