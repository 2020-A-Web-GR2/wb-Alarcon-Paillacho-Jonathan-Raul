import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { MascotaEntity } from '../mascota/mascota.entity';

@Entity()
export class VacunaEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(
    type => MascotaEntity,
    // Que entidad nos relacionamos
    mascota => mascota.vacunas
    // Campo con el que relacionamos
  )
  mascota: MascotaEntity;

}