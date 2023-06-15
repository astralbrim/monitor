import { CronExpression } from '@nestjs/schedule';

export class Setting {
  constructor(
    private _checkAliveInterval: CronExpression,
    private _enableAutoRebootSystem: boolean,
  ) {}

  get checkAliveInterval(): CronExpression {
    return this._checkAliveInterval;
  }

  get enableAutoRebootSystem(): boolean {
    return this._enableAutoRebootSystem;
  }

  updateCheckAliveInterval(interval: CronExpression) {
    this._checkAliveInterval = interval;
  }

  updateEnableAutoRebootSystem(enable: boolean) {
    this._enableAutoRebootSystem = enable;
  }
}
