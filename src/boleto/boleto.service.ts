import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boleto } from './entities/boleto.entity.js';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';

import { Funcion } from '../funcion/entities/funcion.entity.js';
import { Cliente } from '../cliente/entities/cliente.entity.js';
@Injectable()
export class BoletoService {
 constructor(@InjectRepository(Boleto) private repo: Repository<Boleto>, @InjectRepository(Funcion) private funcionRepo: Repository<Funcion>, @InjectRepository(Cliente) private clienteRepo: Repository<Cliente>) {}
 async create(dto: CreateBoletoDto) {
  const funcion = await this.funcionRepo.findOne({where:{idFuncion:dto.idFuncion},relations:['sala']});
  if(!funcion) throw new NotFoundException(`La función con id ${dto.idFuncion} no existe`);
  const cliente = await this.clienteRepo.findOneBy({idCliente:dto.idCliente});
  if(!cliente) throw new NotFoundException(`El cliente con id ${dto.idCliente} no existe`);
  if(dto.numeroAsiento < 1 || dto.numeroAsiento > funcion.sala.capacidad) throw new BadRequestException(`El asiento debe estar entre 1 y ${funcion.sala.capacidad}`);
  const ocupado = await this.repo.findOne({where:{numeroAsiento:dto.numeroAsiento, funcion:{idFuncion:dto.idFuncion}}});
  if(ocupado) throw new BadRequestException(`El asiento ${dto.numeroAsiento} ya está ocupado para esta función`);
  const boleto=this.repo.create({numeroAsiento:dto.numeroAsiento,precioPagado:dto.precioPagado ?? funcion.precio,funcion,cliente}); return this.repo.save(boleto);
 }
 async findAll() { return this.repo.find({relations:['funcion','cliente']}); }
 async findOne(id:number) { const item=await this.repo.findOne({where:{idBoleto:id} as any,relations:['funcion','cliente']}); if(!item) throw new NotFoundException(`Boleto con id ${id} no existe`); return item; }
 async update(id:number,dto:UpdateBoletoDto) {
   const item=await this.findOne(id); const funcionId=dto.idFuncion ?? item.funcion.idFuncion;
   const funcion=await this.funcionRepo.findOne({where:{idFuncion:funcionId},relations:['sala']}); if(!funcion) throw new NotFoundException(`La función con id ${funcionId} no existe`);
   const clienteId=dto.idCliente ?? item.cliente.idCliente; const cliente=await this.clienteRepo.findOneBy({idCliente:clienteId}); if(!cliente) throw new NotFoundException(`El cliente con id ${clienteId} no existe`);
   const asiento=dto.numeroAsiento ?? item.numeroAsiento;
   if(asiento<1 || asiento>funcion.sala.capacidad) throw new BadRequestException(`El asiento debe estar entre 1 y ${funcion.sala.capacidad}`);
   const ocupado=await this.repo.createQueryBuilder('b').where('b.numeroAsiento = :asiento',{asiento}).andWhere('b.idFuncion = :funcion',{funcion:funcionId}).andWhere('b.idBoleto != :id',{id}).getOne();
   if(ocupado) throw new BadRequestException(`El asiento ${asiento} ya está ocupado para esta función`);
   item.numeroAsiento=asiento; item.funcion=funcion; item.cliente=cliente; if(dto.precioPagado!==undefined) item.precioPagado=dto.precioPagado; return this.repo.save(item);
  }
 async remove(id:number) { await this.findOne(id); await this.repo.softDelete(id); return {mensaje:'Boleto eliminado correctamente'}; }
}