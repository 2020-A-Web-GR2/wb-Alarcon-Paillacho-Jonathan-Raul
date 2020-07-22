import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DeberModule} from "./deber/deber.module";




@Module({
  imports: [
        DeberModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
