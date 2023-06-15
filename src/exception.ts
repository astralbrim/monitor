import { HttpException, HttpStatus } from '@nestjs/common';

export class Exception {
  constructor(
    public message: string,
    public statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    public payload?: any,
  ) {}
}

export class NetWorkError extends HttpException {
  constructor() {
    super('通信エラー', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
