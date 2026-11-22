import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sala } from '../sala/entities/sala.entity.js';
import { Pelicula } from '../pelicula/entities/pelicula.entity.js';
import { Funcion } from './entities/funcion.entity.js';
import { FuncionService } from './funcion.service.js';
import { FuncionController } from './funcion.controller.js';
@Module({imports:[TypeOrmModule.forFeature([Funcion,Sala,Pelicula])],controllers:[FuncionController],providers:[FuncionService],exports:[FuncionService]})
export class FuncionModule {}