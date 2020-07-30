import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()

export class UsuarioService {
    // aquí se implementan los diferentes métodos que nosotros necesitemos
    // inyectar los repositorios
    constructor(
        @InjectRepository(UsuarioEntity) //Esto se hace una sola vez por cada servicio
        private repositorio: Repository<UsuarioEntity> //Tipo repositorio
    ) { //Cuando queremos inyectar un servicio
        //aquí se hace la inteccion de Dependencias
        //no sirve para instanciar

    }
    creaUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) // con esto se puede crear un nuevo usuario
    }

}