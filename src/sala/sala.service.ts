import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sala } from './entities/sala.entity.js';
import { CreateSalaDto } from './dto/create-sala.dto.js';
import { UpdateSalaDto } from './dto/update-sala.dto.js';

@Injectable()
export class SalaService {
 constructor(@InjectRepository(Sala) private repo: Repository<Sala>) {}
 async create(dto: CreateSalaDto) { const item=this.repo.create(dto as any); return this.repo.save(item); }
 async findAll() { return this.repo.find({relations:['funciones']}); }
 async findOne(id:number) { const item=await this.repo.findOne({where:{idSala:id} as any,relations:['funciones']}); if(!item) throw new NotFoundException(`Sala con id ${id} no existe`); return item; }
 async update(id:number,dto:UpdateSalaDto) { const item=await this.findOne(id); Object.assign(item,dto); return this.repo.save(item); }
 async remove(id:number) { await this.findOne(id); await this.repo.softDelete(id); return {mensaje:'Sala eliminado correctamente'}; }
}