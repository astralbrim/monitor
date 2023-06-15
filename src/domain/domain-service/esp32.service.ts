import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Esp32Service {
  async reboot(ipAddress: string): Promise<void> {
    await axios.get<void>(`http://${ipAddress}/reboot`).catch(() => {
      throw new Error('マイコンとの通信エラーです');
    });
  }

  async boot(ipAddress: string): Promise<void> {
    await axios.get<void>(`http://${ipAddress}/boot`).catch(() => {
      throw new Error('マイコンとの通信エラーです');
    });
  }

  async shutdown(ipAddress: string): Promise<void> {
    await axios.get<void>(`http://${ipAddress}/shutdown`).catch(() => {
      throw new Error('マイコンとの通信エラーです');
    });
  }

  async check(ipAddress: string): Promise<void> {
    await axios.get(`http://${ipAddress}/check`).catch(() => {
      throw new Error('マイコンとの通信エラーです');
    });
  }
}
