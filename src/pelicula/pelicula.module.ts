import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from '../genero/entities/genero.entity.js';
import { Pelicula } from './entities/pelicula.entity.js';
import { PeliculaService } from './pelicula.service.js';
import { PeliculaController } from './pelicula.controller.js';
@Module({imports:[TypeOrmModule.forFeature([Pelicula,Genero])],controllers:[PeliculaController],providers:[PeliculaService],exports:[PeliculaService]})
export class PeliculaModule {}