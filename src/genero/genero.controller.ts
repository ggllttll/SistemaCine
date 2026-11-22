import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GeneroService } from './genero.service.js';
import { CreateGeneroDto } from './dto/create-genero.dto.js';
import { UpdateGeneroDto } from './dto/update-genero.dto.js';
@ApiTags('Genero') @Controller('generos')
export class GeneroController { constructor(private readonly service:GeneroService){}
 @Post() @ApiOperation({summary:'Crear Genero'}) @ApiResponse({status:201,description:'Creado correctamente'}) create(@Body() dto:CreateGeneroDto) { return this.service.create(dto); }
 @Get() @ApiResponse({status:200,description:'Listado obtenido correctamente'}) @ApiOperation({summary:'Listar Generos'}) findAll() { return this.service.findAll(); }
 @Get(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Obtener Genero por id'}) findOne(@Param('id',ParseIntPipe) id:number) { return this.service.findOne(id); }
 @Patch(':id') @ApiResponse({status:400,description:'Datos inválidos'}) @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Actualizar Genero'}) update(@Param('id',ParseIntPipe) id:number,@Body() dto:UpdateGeneroDto) { return this.service.update(id,dto); }
 @Delete(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Eliminar Genero (borrado lógico)'}) remove(@Param('id',ParseIntPipe) id:number) { return this.service.remove(id); }

}