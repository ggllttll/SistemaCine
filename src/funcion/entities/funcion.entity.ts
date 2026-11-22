import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/base.entity.js';
import { Sala } from '../../sala/entities/sala.entity.js';
import { Pelicula } from '../../pelicula/entities/pelicula.entity.js';
import { Boleto } from '../../boleto/entities/boleto.entity.js';

@Entity()
export class Funcion extends BaseEntity {
  @PrimaryGeneratedColumn() idFuncion: number;
  @Column({ type: 'timestamp' }) fechaHora: Date;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) precio: number;

  @ManyToOne(() => Sala, (sala) => sala.funciones, { nullable: false })
  @JoinColumn({ name: 'idSala' })
  sala: Relation<Sala>;

  @ManyToOne(() => Pelicula, (pelicula) => pelicula.funciones, { nullable: false })
  @JoinColumn({ name: 'idPelicula' })
  pelicula: Relation<Pelicula>;

  @OneToMany(() => Boleto, (boleto) => boleto.funcion)
  boletos: Relation<Boleto[]>;
}
