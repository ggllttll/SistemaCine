import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Funcion } from '../funcion/entities/funcion.entity.js';
import { Cliente } from '../cliente/entities/cliente.entity.js';
import { Boleto } from './entities/boleto.entity.js';
import { BoletoService } from './boleto.service.js';
import { BoletoController } from './boleto.controller.js';
@Module({imports:[TypeOrmModule.forFeature([Boleto,Funcion,Cliente])],controllers:[BoletoController],providers:[BoletoService],exports:[BoletoService]})
export class BoletoModule {}