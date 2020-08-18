import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MascotaEntity } from '../mascota/mascota.entity';

@Index([
    'nombre',
    'apellido',
    'cedula',
    'fechaNacimiento' // Nombres de las propiedades en la clase
])
@Index(
    ['nombre', 'apellido', 'cedula'],
    {unique: true}
)


@Entity('db_usuario') //nombre de la tabla en la base de datos

export class UsuarioEntity {
    @PrimaryGeneratedColumn({
        unsigned: true,
        comment: 'Identificador',
        name: 'id'
    })
    id: number



    @Column({
        name: 'nombre', //nombre de la columna dentro de la tabla
        type: 'varchar' //se puede ver el tipo
    })
    nombre?: string

    @Column({
        name: 'apellido',
        type: 'varchar',
        nullable: true,
        length: '60'
    })
    apellido?: string

    @Column({
        name: 'cedula',
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '18'
    })
    cedula: string;

    @Column({
        name: 'sueldo',
        nullable: true,
        type: 'decimal',
        precision: 10, // 1000000000.
        scale: 4, // .0001
    })
    sueldo?: number;

    @Column({
        nullable: true,
        type: 'date',
        name: 'fecha_nacimiento'
    })
    fechaNacimiento?: string;

    @Column({
        nullable: true,
        type: 'datetime',
        name: 'fecha_hora_nacimiento'
    })
    fechaHoraNacimiento?: string;



    // Aquí se pone las relaciones
    // Siempre al último

    // El usuario tiene una relacion de uno a mucho

    //Se define el tipo de datos y con que tabla nos vamos a relacionar

    @OneToMany(
      //Lo primero es el tipo
      // Que campos vamos a relacionar
      type => MascotaEntity, // Que entidad nos vamos a relacionar

      // Vamos a especificar el campo por el que se van a relacionar
      mascota => mascota.usuario
    )
    // Siempre lo vamos a definir como plural
    mascotas: MascotaEntity[];



}