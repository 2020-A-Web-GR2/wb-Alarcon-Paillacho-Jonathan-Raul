import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Importar cosas en TS
const cookieParser = require('cookie-parser'); //Importar modulos en JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*
  * AQUI SE REALIZAN LAS CONFIGURACIONES
  * ANTES DEL APP.LISTEN()
   */
  app.use(cookieParser()) //estamos haciendo una configuracion de express JS

  await app.listen(3001);
}
bootstrap();
