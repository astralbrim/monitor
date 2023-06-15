import { ConnectionOptions } from 'typeorm';

export default <ConnectionOptions>{
  type: 'sqlite',
  database: 'db/data.db',
  synchronize: true,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
};
