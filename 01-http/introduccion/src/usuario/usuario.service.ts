import {Injectable} from "@nestjs/common";
import {
    Between,
    FindManyOptions,
    In,
    IsNull,
    LessThan,
    LessThanOrEqual,
    Like,
    MoreThan, MoreThanOrEqual,
    Not,
    Repository
} from "typeorm";
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

    buscarTodos(textoDeConsulta?: string){
        /*let busquedaEjemplo: FindManyOptions<UsuarioEntity>
        //buscar y relacionar
        busquedaEjemplo = {
            relations: ['mascotas','mascotas.vacunas']
        }
        // Buscar where
        busquedaEjemplo = {
            where: { // & AND
                nombre: 'Jonathan', // BUSQUEDA EXACTA and
                apellido: 'Alarcon' // BUSQUEDA EXACTA
            }
        }
        // ORDENAR
        busquedaEjemplo = {
            order: {
                nombre: 'ASC', // ASCENDENTE
                id: 'DESC' // DESCENDENTE
            }
        }
        // buscar con paginación
        // Siempre tenemos que paginar
        busquedaEjemplo = {
            skip: 0, // de 100 registros, saltate 0 registros
            take: 10 // de 100 registros, agarra 10 registros
        }

        // BUSQUEDA WHERE CON OR
        busquedaEjemplo = {
            where: [
                { //
                    nombre: 'Jonathan', // BUSQUEDA EXACTA OR
                    tipoUsuario: 1 // TAMBIÉN SE PUEDE USAR LAS RELACIONES PAPÁS
                }, // OR
                {
                    apellido: 'Alarcon' // BUSQUEDA EXACTA
                }]
        }
        // BUSQUEDA WHERE CON OR y AND

        busquedaEjemplo = {
            where: [
                { // & AND
                    nombre: 'Jonathan', // AND
                    apellido: 'Alarcon'
                }, // OR
                {
                    nombre: 'Alarcon',
                    apellido: 'Jonathan' // AND
                }]
        }

        // MODIFICADORES not
        busquedaEjemplo = {
            where: {
                nombre: Not('Jonathan'),

            }
        }

        busquedaEjemplo = {
            where: {
                fechaNacimiento: LessThan('1990-01-01'), // AND
            }
        }
        // Busqueda Less Than or Equal
        busquedaEjemplo = {
            where: {
                fechaNacimiento: LessThanOrEqual('1990-01-01'), // AND
            }
        }
        // Busqueda More Than
        busquedaEjemplo = {
            where: {
                fechaNacimiento: MoreThan('1990-01-01'), // AND
            }
        }
        // Busqueda More Than or Equal
        busquedaEjemplo = {
            where: {
                fechaNacimiento: MoreThanOrEqual('1990-01-01'), // AND
            }
        }
        // Busqueda Like
        busquedaEjemplo = {
            where: {
                nombre: Like('%na%'), // AND
            }
        }
        // Busqueda Beetwen
        busquedaEjemplo = {
            where: {
                fechaNacimiento: Between('1990-01-01', '2020-01-01'), // AND
            }
        }
        // Busqueda In
        busquedaEjemplo = {
            where: {
                pokemon: In([1, 2, 5, 6, 7, 8, 9, 19]),
            }
        }
        // Busqueda IsNull
        busquedaEjemplo = {
            where: {
                casado: IsNull(),
            }
        }*/

        const consulta: FindManyOptions<UsuarioEntity> = {
            where:[
                {
                    nombre: Like(`%${textoDeConsulta}%`)
                },
                {
                    apellido: Like(`%${textoDeConsulta}%`)
                },
                {
                    cedula: Like(`%${textoDeConsulta}%`)
                }
            ]
        }

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