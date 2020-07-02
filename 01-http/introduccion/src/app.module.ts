import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      //aquí otros modulos
  ],
  controllers: [
      //controladores APP MODULE
      AppController],
  providers: [
      //servicios APP MODULE
      AppService],
})
export class AppModule {}
