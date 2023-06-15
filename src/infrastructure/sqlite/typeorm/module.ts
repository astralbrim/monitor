import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { Node } from './entities/node.entity';
import repositoryProviders from './repository-providers';
import { Client } from './entities/client.entity';
import { Controller } from './entities/controller.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...ormconfig,
    }),
    TypeOrmModule.forFeature([Node, Client, Controller]),
  ],
  providers: [...repositoryProviders],
  exports: [TypeOrmModule, ...repositoryProviders],
})
export class SQLiteTypeormModule {}
