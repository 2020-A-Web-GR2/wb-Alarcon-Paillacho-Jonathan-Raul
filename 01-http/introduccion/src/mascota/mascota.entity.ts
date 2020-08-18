import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { VacunaEntity } from '../vacuna/vacuna.entity';

@Entity()

export class MascotaEntity {
  // Vamos a crear la columna general
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToOne(
    type => UsuarioEntity,
    // Que entidad nos relacionamos
    usuario => usuario.mascotas
    // Campo con el que relacionamos
  )
  usuario: UsuarioEntity;

  @OneToMany(
    type => VacunaEntity,
    vacuna => vacuna.mascota
  )
  vacunas: VacunaEntity[];

}