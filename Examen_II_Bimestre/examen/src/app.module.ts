import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {TypeOrmModule} from "@nestjs/typeorm";
import {MarcaEntity} from "./marca/marca.entity";
import {MarcaModule} from "./marca/marca.module";

@Module({
  imports: [
      MarcaModule,
    TypeOrmModule.forRoot({
      name: 'default', //nombre de la conexión, podemos tener varias conexiones
      type: 'mysql', // el tipo puede ser mysql postgres, etc
      host: 'localhost', // ip
      port: 3306, // puerto
      username: 'root', //usuario
      password: 'root', // password
      database: 'marca', // Base de datos
      entities: [
        MarcaEntity
      ], // TODAS LAS ENTIDADES, tienen que estar incluidas todas las entidades que creamos
      synchronize: true, // Actualiza el esquema de la base de datos
      dropSchema: false // Elimina los datos y el esquema de la base de datos
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
