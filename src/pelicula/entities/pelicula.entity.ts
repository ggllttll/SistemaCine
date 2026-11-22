import { Column, Entity, PrimaryGeneratedColumn, JoinTable, OneToMany, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity.js';
import { Funcion } from '../../funcion/entities/funcion.entity.js';
import { Genero } from '../../genero/entities/genero.entity.js';


@Entity()
export class Pelicula extends BaseEntity {
 @PrimaryGeneratedColumn() idPelicula: number;
 @Column() titulo: string;
 @Column({type:'text'}) sinopsis: string;
 @Column() duracionMin: number;
 @Column() clasificacion: string;
 @OneToMany(() => Funcion, (funcion) => funcion.pelicula) funciones: Funcion[];
 @ManyToMany(() => Genero, (genero) => genero.peliculas)
 @JoinTable({name:'pelicula_genero', joinColumn:{name:'idPelicula', referencedColumnName:'idPelicula'}, inverseJoinColumn:{name:'idGenero', referencedColumnName:'idGenero'}}) generos: Genero[];
}