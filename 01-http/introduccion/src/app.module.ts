import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
      //aquí otros modulos
      HttpJuegoModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: 'default', //nombre de la conexión, podemos tener varias conexiones
          type: 'mysql', // el tipo puede ser mysql postgres, etc
          host: 'localhost', // ip
          port: 3306, // puerto
          username: 'root', //usuario
          password: 'root', // password
          database: 'test', // Base de datos
          entities: [
              UsuarioEntity
          ], // TODAS LAS ENTIDADES, tienen que estar incluidas todas las entidades que creamos
          synchronize: true, // Actualiza el esquema de la base de datos
          dropSchema: false // Elimina los datos y el esquema de la base de datos
      })

  ],
  controllers: [
      //controladores APP MODULE
      AppController],
  providers: [
      //servicios APP MODULE
      AppService],
})
export class AppModule {}
