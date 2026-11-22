import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity.js';
import { Funcion } from '../../funcion/entities/funcion.entity.js';


@Entity()
export class Sala extends BaseEntity {
 @PrimaryGeneratedColumn() idSala: number;
 @Column() nombre: string;
 @Column() capacidad: number;
 @Column() tipo: string;
 @OneToMany(() => Funcion, (funcion) => funcion.sala) funciones: Funcion[];
}