import { Module } from '@nestjs/common';
import { SQLiteTypeormModule } from './sqlite/typeorm/module';

@Module({})
export class RepositoryModule {
  static register() {
    return {
      module: SQLiteTypeormModule,
    };
  }
}
