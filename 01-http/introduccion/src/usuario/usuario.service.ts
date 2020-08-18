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
        //aquí se hace la inyeccion de Dependencias
        //no sirve para instanciar

    }
    creaUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario) // con esto se puede crear un nuevo usuario
        // Esto nos devuelve una promesa
    }

    //promesas
    // Codigos asincronos en typescript

    buscarTodos(){
        return this.repositorio.find() // promesa
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id) // promesa
    }

    // Clase 14/08/2020
    editarUno(usuarioEditado: UsuarioEntity){
        return this.repositorio.save(usuarioEditado); // con esto se puede editar un usuario
        // Esto nos devuelve una promesa
    }

    eliminarUno(id: number){
        return this.repositorio.delete(id); // con esto se puede eliminar un usuario
        // Esto nos devuelve una promesa
    }





}