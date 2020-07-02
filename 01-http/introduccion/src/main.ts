import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * AQUI SE REALIZAN LAS CONFIGURACIONES
  * ANTES DEL APP.LISTEN()
   */
  await app.listen(3001);
}
bootstrap();
