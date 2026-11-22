import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SalaService } from './sala.service.js';
import { CreateSalaDto } from './dto/create-sala.dto.js';
import { UpdateSalaDto } from './dto/update-sala.dto.js';
@ApiTags('Sala') @Controller('salas')
export class SalaController { constructor(private readonly service:SalaService){}
 @Post() @ApiOperation({summary:'Crear Sala'}) @ApiResponse({status:201,description:'Creado correctamente'}) create(@Body() dto:CreateSalaDto) { return this.service.create(dto); }
 @Get() @ApiResponse({status:200,description:'Listado obtenido correctamente'}) @ApiOperation({summary:'Listar Salas'}) findAll() { return this.service.findAll(); }
 @Get(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Obtener Sala por id'}) findOne(@Param('id',ParseIntPipe) id:number) { return this.service.findOne(id); }
 @Patch(':id') @ApiResponse({status:400,description:'Datos inválidos'}) @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Actualizar Sala'}) update(@Param('id',ParseIntPipe) id:number,@Body() dto:UpdateSalaDto) { return this.service.update(id,dto); }
 @Delete(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Eliminar Sala (borrado lógico)'}) remove(@Param('id',ParseIntPipe) id:number) { return this.service.remove(id); }

}