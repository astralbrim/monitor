import { Exception } from '../../../exception';

export class IPAddress {
  constructor(private _value: string) {
    const regex = RegExp(
      /^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$/,
    );
    if (!regex.test(_value))
      throw new Exception('IPアドレスのフォーマットが正しくないです。');
  }
  get value(): string {
    return this._value;
  }
}
