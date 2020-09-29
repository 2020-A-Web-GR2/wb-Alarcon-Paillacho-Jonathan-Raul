import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('marca')
export class MarcaEntity {
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
        name: 'color', //nombre de la columna dentro de la tabla
        type: 'varchar' //se puede ver el tipo
    })
    color?: string

    @Column({
        name: 'anios', //nombre de la columna dentro de la tabla
        type: 'integer' //se puede ver el tipo
    })
    anios?: number

    @Column({
        name: 'origen',
        type: 'varchar'
    })
    origen?: string

    @Column({
        name: 'empresa',
        type: 'varchar'
    })
    empresa?: string


}