import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Funcion } from './entities/funcion.entity.js';
import { Sala } from '../sala/entities/sala.entity.js';
import { Pelicula } from '../pelicula/entities/pelicula.entity.js';
import { CreateFuncionDto } from './dto/create-funcion.dto.js';
import { UpdateFuncionDto } from './dto/update-funcion.dto.js';

@Injectable()
export class FuncionService {
 constructor(
  @InjectRepository(Funcion) private repo: Repository<Funcion>,
  @InjectRepository(Sala) private salaRepo: Repository<Sala>,
  @InjectRepository(Pelicula) private peliculaRepo: Repository<Pelicula>,
 ) {}
 async validarReferencias(idSala:number,idPelicula:number) {
  const sala=await this.salaRepo.findOneBy({idSala});
  if(!sala) throw new NotFoundException(`La sala con id ${idSala} no existe`);
  const pelicula=await this.peliculaRepo.findOneBy({idPelicula});
  if(!pelicula) throw new NotFoundException(`La película con id ${idPelicula} no existe`);
  return {sala,pelicula};
 }
 async create(dto:CreateFuncionDto) { const {sala,pelicula}=await this.validarReferencias(dto.idSala,dto.idPelicula); const item=this.repo.create({fechaHora:new Date(dto.fechaHora),precio:dto.precio,sala,pelicula}); return this.repo.save(item); }
 async findAll() { return this.repo.find({relations:['sala','pelicula']}); }
 async findOne(id:number) { const item=await this.repo.findOne({where:{idFuncion:id},relations:['sala','pelicula','boletos']}); if(!item) throw new NotFoundException(`La función con id ${id} no existe`); return item; }
 async update(id:number,dto:UpdateFuncionDto) { const item=await this.findOne(id); if(dto.idSala!==undefined || dto.idPelicula!==undefined) { const refs=await this.validarReferencias(dto.idSala??item.sala.idSala,dto.idPelicula??item.pelicula.idPelicula); item.sala=refs.sala; item.pelicula=refs.pelicula; } if(dto.fechaHora!==undefined) item.fechaHora=new Date(dto.fechaHora); if(dto.precio!==undefined) item.precio=dto.precio; return this.repo.save(item); }
 async remove(id:number) { await this.findOne(id); await this.repo.softDelete(id); return {mensaje:'Función eliminada correctamente'}; }
}
