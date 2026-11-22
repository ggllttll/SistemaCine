import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pelicula } from './entities/pelicula.entity.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';
import { Genero } from '../genero/entities/genero.entity.js';
import { In } from 'typeorm';
@Injectable()
export class PeliculaService {
 constructor(@InjectRepository(Pelicula) private repo: Repository<Pelicula>, @InjectRepository(Genero) private generoRepo: Repository<Genero>) {}
 async create(dto: CreatePeliculaDto) {
    const generos = dto.idGeneros?.length ? await this.generoRepo.findBy({ idGenero: In(dto.idGeneros) }) : [];
    if (dto.idGeneros?.length && generos.length !== dto.idGeneros.length) throw new NotFoundException('Uno o más géneros no existen');
    const { idGeneros, ...datos } = dto as any;
    const item = this.repo.create({ ...datos, generos }); return this.repo.save(item);
 }
 async findAll() { return this.repo.find({relations:['generos','funciones']}); }
 async findOne(id:number) { const item=await this.repo.findOne({where:{idPelicula:id} as any,relations:['generos','funciones']}); if(!item) throw new NotFoundException(`Película con id ${id} no existe`); return item; }
 async update(id:number,dto:UpdatePeliculaDto) { const item=await this.findOne(id); const {idGeneros,...datos}=dto as any; Object.assign(item,datos); return this.repo.save(item); }
 async remove(id:number) { await this.findOne(id); await this.repo.softDelete(id); return {mensaje:'Película eliminada correctamente'}; }
 async asignarGeneros(id:number,idGeneros:number[]) { const p=await this.findOne(id); const gs=await this.generoRepo.findBy({idGenero:In(idGeneros)}); if(gs.length!==idGeneros.length) throw new NotFoundException('Uno o más géneros no existen'); p.generos=[...p.generos,...gs]; return this.repo.save(p); }
 async quitarGenero(id:number,idGenero:number) { const p=await this.findOne(id); p.generos=p.generos.filter(g=>g.idGenero!==idGenero); return this.repo.save(p); }
}