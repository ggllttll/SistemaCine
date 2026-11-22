import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sala } from './entities/sala.entity.js';
import { SalaService } from './sala.service.js';
import { SalaController } from './sala.controller.js';
@Module({imports:[TypeOrmModule.forFeature([Sala])],controllers:[SalaController],providers:[SalaService],exports:[SalaService]})
export class SalaModule {}