import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http.module";

@Module({
  imports: [
      //aquí otros modulos
      HttpJuegoModule
  ],
  controllers: [
      //controladores APP MODULE
      AppController],
  providers: [
      //servicios APP MODULE
      AppService],
})
export class AppModule {}
