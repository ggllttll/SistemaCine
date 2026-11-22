import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FuncionService } from './funcion.service.js';
import { CreateFuncionDto } from './dto/create-funcion.dto.js';
import { UpdateFuncionDto } from './dto/update-funcion.dto.js';
@ApiTags('Funcion') @Controller('funciones')
export class FuncionController { constructor(private readonly service:FuncionService){}
 @Post() @ApiOperation({summary:'Crear función'}) @ApiResponse({status:201,description:'Creado correctamente'}) create(@Body() dto:CreateFuncionDto) { return this.service.create(dto); }
 @Get() @ApiResponse({status:200,description:'Listado obtenido correctamente'}) @ApiOperation({summary:'Listar funciones'}) findAll() { return this.service.findAll(); }
 @Get(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Obtener función por id'}) findOne(@Param('id',ParseIntPipe) id:number) { return this.service.findOne(id); }
 @Patch(':id') @ApiResponse({status:400,description:'Datos inválidos'}) @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Actualizar función'}) update(@Param('id',ParseIntPipe) id:number,@Body() dto:UpdateFuncionDto) { return this.service.update(id,dto); }
 @Delete(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Eliminar función (borrado lógico)'}) remove(@Param('id',ParseIntPipe) id:number) { return this.service.remove(id); }

}