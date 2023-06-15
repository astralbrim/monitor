import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpApiDocs } from './presentation/swagger';
import { LoggerService } from './domain/domain-service/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useLogger(app.get(LoggerService));
  setUpApiDocs(app);
  await app.listen(3000);
}
bootstrap();
