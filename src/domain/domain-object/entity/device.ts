import { IPAddress } from '../value-object/ip-address';

export class Device<T> {
  constructor(
    private _id: number,
    private _ipAddress: IPAddress,
    private _status: T,
    private _isBelongNode: boolean,
  ) {}

  get id(): number {
    return this._id;
  }

  get ipAddress(): IPAddress {
    return this._ipAddress;
  }

  get status(): T {
    return this._status;
  }

  get isBelongNode(): boolean {
    return this._isBelongNode;
  }

  updateStatus(status: T) {
    this._status = status;
  }

  updateIsBelongNode(isBelongNode: boolean) {
    this._isBelongNode = isBelongNode;
  }
}
