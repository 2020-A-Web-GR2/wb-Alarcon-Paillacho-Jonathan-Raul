import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {MarcaEntity} from "./marca.entity";
import {Repository} from "typeorm";

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

    buscarTodos(){
        return this.repository.find()
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