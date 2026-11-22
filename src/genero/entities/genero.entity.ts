import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity.js';
import { Pelicula } from '../../pelicula/entities/pelicula.entity.js';


@Entity()
export class Genero extends BaseEntity {
 @PrimaryGeneratedColumn() idGenero: number;
 @Column() nombre: string;
 @Column({type:'text'}) descripcion: string;
 @ManyToMany(() => Pelicula, (pelicula) => pelicula.generos) peliculas: Pelicula[];
}