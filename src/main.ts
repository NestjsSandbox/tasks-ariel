//* main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const logger = new Logger('main.ts');
  const app = await NestFactory.create(AppModule);

  
  //todo: Refactor this app.useGlobal.. to run from app.module not main.ts
  app.useGlobalInterceptors(new TransformInterceptor());

  const appPort = process.env.PORT;
  await app.listen(appPort);
  logger.log(`App is now listening on port ${appPort}.`);
  logger.log(`NODE_ENV variables value is = ${process.env.NODE_ENV} `);
}
bootstrap();
