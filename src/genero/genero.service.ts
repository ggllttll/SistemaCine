import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genero } from './entities/genero.entity.js';
import { CreateGeneroDto } from './dto/create-genero.dto.js';
import { UpdateGeneroDto } from './dto/update-genero.dto.js';

@Injectable()
export class GeneroService {
 constructor(@InjectRepository(Genero) private repo: Repository<Genero>) {}
 async create(dto: CreateGeneroDto) { const item=this.repo.create(dto as any); return this.repo.save(item); }
 async findAll() { return this.repo.find({relations:['peliculas']}); }
 async findOne(id:number) { const item=await this.repo.findOne({where:{idGenero:id} as any,relations:['peliculas']}); if(!item) throw new NotFoundException(`Genero con id ${id} no existe`); return item; }
 async update(id:number,dto:UpdateGeneroDto) { const item=await this.findOne(id); Object.assign(item,dto); return this.repo.save(item); }
 async remove(id:number) { await this.findOne(id); await this.repo.softDelete(id); return {mensaje:'Genero eliminado correctamente'}; }
}