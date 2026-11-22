import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';

@Injectable()
export class ClienteService {
 constructor(@InjectRepository(Cliente) private repo: Repository<Cliente>) {}
 async create(dto: CreateClienteDto) { const item=this.repo.create(dto as any); return this.repo.save(item); }
 async findAll() { return this.repo.find({relations:['boletos','boletos.funcion']}); }
 async findOne(id:number) { const item=await this.repo.findOne({where:{idCliente:id} as any,relations:['boletos','boletos.funcion']}); if(!item) throw new NotFoundException(`Cliente con id ${id} no existe`); return item; }
 async update(id:number,dto:UpdateClienteDto) { const item=await this.findOne(id); Object.assign(item,dto); return this.repo.save(item); }
 async remove(id:number) { await this.findOne(id); await this.repo.softDelete(id); return {mensaje:'Cliente eliminado correctamente'}; }
}