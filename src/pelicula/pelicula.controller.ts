import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PeliculaService } from './pelicula.service.js';
import { CreatePeliculaDto } from './dto/create-pelicula.dto.js';
import { UpdatePeliculaDto } from './dto/update-pelicula.dto.js';
import { AsignarGenerosDto } from './dto/asignar-generos.dto.js';
@ApiTags('Pelicula') @Controller('peliculas')
export class PeliculaController { constructor(private readonly service:PeliculaService){}
 @Post() @ApiOperation({summary:'Crear Pelicula'}) @ApiResponse({status:201,description:'Creado correctamente'}) create(@Body() dto:CreatePeliculaDto) { return this.service.create(dto); }
 @Get() @ApiResponse({status:200,description:'Listado obtenido correctamente'}) @ApiOperation({summary:'Listar Peliculas'}) findAll() { return this.service.findAll(); }
 @Get(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Obtener Pelicula por id'}) findOne(@Param('id',ParseIntPipe) id:number) { return this.service.findOne(id); }
 @Patch(':id') @ApiResponse({status:400,description:'Datos inválidos'}) @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Actualizar Pelicula'}) update(@Param('id',ParseIntPipe) id:number,@Body() dto:UpdatePeliculaDto) { return this.service.update(id,dto); }
 @Delete(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Eliminar Pelicula (borrado lógico)'}) remove(@Param('id',ParseIntPipe) id:number) { return this.service.remove(id); }

 @Post(':id/generos') @ApiOperation({summary:'Asignar géneros a una película'}) asignar(@Param('id',ParseIntPipe) id:number,@Body() body:AsignarGenerosDto) { return this.service.asignarGeneros(id,body.idGeneros); }
 @Delete(':id/generos/:idGenero') quitar(@Param('id',ParseIntPipe) id:number,@Param('idGenero',ParseIntPipe) idGenero:number) { return this.service.quitarGenero(id,idGenero); }

}