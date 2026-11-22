import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genero } from './entities/genero.entity.js';
import { GeneroService } from './genero.service.js';
import { GeneroController } from './genero.controller.js';
@Module({imports:[TypeOrmModule.forFeature([Genero])],controllers:[GeneroController],providers:[GeneroService],exports:[GeneroService]})
export class GeneroModule {}