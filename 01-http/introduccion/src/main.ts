import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; //Importar cosas en TS
const cookieParser = require('cookie-parser'); //Importar modulos en JS
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  /*
  * AQUI SE REALIZAN LAS CONFIGURACIONES
  * ANTES DEL APP.LISTEN()
   */
  app.use(cookieParser('Ya no me quiero morir jejex')) //estamos haciendo una configuracion de express JS
    //Lo que le mandamos en las comillas simples es el secreto
  app.set('view engine', 'ejs')

  app.use(express.static('publico'))


  await app.listen(3001);
}
bootstrap();
