import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity.js';
import { Boleto } from '../../boleto/entities/boleto.entity.js';


@Entity()
export class Cliente extends BaseEntity {
 @PrimaryGeneratedColumn() idCliente: number;
 @Column() nombres: string;
 @Column() paterno: string;
 @Column() materno: string;
 @Column() email: string;
 @OneToMany(() => Boleto, (boleto) => boleto.cliente) boletos: Boleto[];
}