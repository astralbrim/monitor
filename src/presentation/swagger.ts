import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../app.module';

export const setUpApiDocs = (app: INestApplication) => {
  const apiOptions = new DocumentBuilder().setTitle('API').build();

  const api = SwaggerModule.createDocument(app, apiOptions, {
    include: [AppModule],
  });

  SwaggerModule.setup('docs', app, api);
};
