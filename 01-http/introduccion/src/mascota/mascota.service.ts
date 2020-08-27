import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { Repository } from 'typeorm';
import { MascotaEntity } from './mascota.entity';

@Injectable()

export class MascotaService {
    constructor(
      @InjectRepository(MascotaEntity) //Esto se hace una sola vez por cada servicio
      private repositorio: Repository<MascotaEntity>
    ) {
    }

    creaNuevaMascota(mascota: MascotaEntity){
      return this.repositorio.save(mascota);
    }


}