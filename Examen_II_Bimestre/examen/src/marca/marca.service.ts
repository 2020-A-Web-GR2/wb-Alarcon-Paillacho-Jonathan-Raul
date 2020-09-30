import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MarcaEntity} from "./marca.entity";
import {FindManyOptions, Like, Repository} from "typeorm";

@Injectable()
export class MarcaService {
    constructor(
        @InjectRepository(MarcaEntity)
        private repository: Repository<MarcaEntity>
    ) {
    }

    crearUno(nuevaMarca: MarcaEntity){
        return this.repository.save(nuevaMarca)
    }

    buscarTodos(consulta?:string){

        if(!consulta){
            consulta = ""
        }

        const consulta1: FindManyOptions<MarcaEntity> = {

            where:[
                {
                    nombre: Like(`%${consulta}%`)
                },
                {
                    color: Like(`%${consulta}%`)
                },
                {
                    anios: Like(`%${consulta}%`)
                },
                {
                    origen: Like(`%${consulta}%`)
                },
                {
                    empresa: Like(`%${consulta}%`)
                }
            ]
        }

        return this.repository.find(consulta1)
    }

    buscarUno(id: number){
        return this.repository.findOne(id)
    }

    editarUno(marcaEdit: MarcaEntity){
        return this.repository.save(marcaEdit)
    }

    eliminarUno(id:number) {
        return this.repository.delete(id);
    }

}