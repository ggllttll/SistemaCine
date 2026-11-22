import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, type Relation } from 'typeorm';
import { BaseEntity } from '../../common/base.entity.js';
import { Funcion } from '../../funcion/entities/funcion.entity.js';
import { Cliente } from '../../cliente/entities/cliente.entity.js';

@Entity()
export class Boleto extends BaseEntity {
  @PrimaryGeneratedColumn() idBoleto: number;
  @Column() numeroAsiento: number;
  @Column({ type: 'decimal', precision: 10, scale: 2 }) precioPagado: number;

  @ManyToOne(() => Funcion, (funcion) => funcion.boletos, { nullable: false })
  @JoinColumn({ name: 'idFuncion' })
  funcion: Relation<Funcion>;

  @ManyToOne(() => Cliente, (cliente) => cliente.boletos, { nullable: false })
  @JoinColumn({ name: 'idCliente' })
  cliente: Relation<Cliente>;
}
