import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";
import { MascotaModule } from './mascota/mascota.module';
import { VacunaModule } from './vacuna/vacuna.module';
import { MascotaEntity } from './mascota/mascota.entity';
import { VacunaEntity } from './vacuna/vacuna.entity';

@Module({
  imports: [
      //aquí otros modulos
      HttpJuegoModule,
      UsuarioModule,
      MascotaModule,
      VacunaModule,
      TypeOrmModule.forRoot({
          name: 'default', //nombre de la conexión, podemos tener varias conexiones
          type: 'mysql', // el tipo puede ser mysql postgres, etc
          host: 'localhost', // ip
          port: 3306, // puerto
          username: 'root', //usuario
          password: 'root', // password
          database: 'ejemploweb', // Base de datos
          entities: [
              UsuarioEntity,
              MascotaEntity,
              VacunaEntity
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
