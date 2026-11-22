import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClienteService } from './cliente.service.js';
import { CreateClienteDto } from './dto/create-cliente.dto.js';
import { UpdateClienteDto } from './dto/update-cliente.dto.js';
@ApiTags('Cliente') @Controller('clientes')
export class ClienteController { constructor(private readonly service:ClienteService){}
 @Post() @ApiOperation({summary:'Crear Cliente'}) @ApiResponse({status:201,description:'Creado correctamente'}) create(@Body() dto:CreateClienteDto) { return this.service.create(dto); }
 @Get() @ApiResponse({status:200,description:'Listado obtenido correctamente'}) @ApiOperation({summary:'Listar Clientes'}) findAll() { return this.service.findAll(); }
 @Get(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Obtener Cliente por id'}) findOne(@Param('id',ParseIntPipe) id:number) { return this.service.findOne(id); }
 @Patch(':id') @ApiResponse({status:400,description:'Datos inválidos'}) @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Actualizar Cliente'}) update(@Param('id',ParseIntPipe) id:number,@Body() dto:UpdateClienteDto) { return this.service.update(id,dto); }
 @Delete(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Eliminar Cliente (borrado lógico)'}) remove(@Param('id',ParseIntPipe) id:number) { return this.service.remove(id); }

}