import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { BreedModule } from './app/breed.module';
import {AppExceptionFilter} from './app/filters/exceptions-filter';

async function bootstrap() {
  const app = await NestFactory.create(BreedModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new AppExceptionFilter());
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
