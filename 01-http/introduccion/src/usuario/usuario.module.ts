import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {UsuarioService} from "./usuario.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {MascotaModule} from "../mascota/mascota.module";


@Module({
    imports: [
        MascotaModule,
        TypeOrmModule
            .forFeature([UsuarioEntity], 'default' )
        //acepta un arreglo de entidades y el nombre de la cadena de conexión
        //Con esto se puede acceder a los métodos de la tabla en la base de datos
    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ]
})

export class UsuarioModule {

}