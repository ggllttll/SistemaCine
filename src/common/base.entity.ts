import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
export abstract class BaseEntity {
 @CreateDateColumn({type:'timestamp'}) creadoEn: Date;
 @UpdateDateColumn({type:'timestamp'}) actualizadoEn: Date;
 @DeleteDateColumn({type:'timestamp', nullable:true}) eliminadoEn: Date;
}