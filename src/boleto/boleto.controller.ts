import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BoletoService } from './boleto.service.js';
import { CreateBoletoDto } from './dto/create-boleto.dto.js';
import { UpdateBoletoDto } from './dto/update-boleto.dto.js';
@ApiTags('Boleto') @Controller('boletos')
export class BoletoController { constructor(private readonly service:BoletoService){}
 @Post() @ApiOperation({summary:'Crear Boleto'}) @ApiResponse({status:201,description:'Creado correctamente'}) create(@Body() dto:CreateBoletoDto) { return this.service.create(dto); }
 @Get() @ApiResponse({status:200,description:'Listado obtenido correctamente'}) @ApiOperation({summary:'Listar Boletos'}) findAll() { return this.service.findAll(); }
 @Get(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Obtener Boleto por id'}) findOne(@Param('id',ParseIntPipe) id:number) { return this.service.findOne(id); }
 @Patch(':id') @ApiResponse({status:400,description:'Datos inválidos'}) @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Actualizar Boleto'}) update(@Param('id',ParseIntPipe) id:number,@Body() dto:UpdateBoletoDto) { return this.service.update(id,dto); }
 @Delete(':id') @ApiResponse({status:404,description:'Recurso no encontrado'}) @ApiOperation({summary:'Eliminar Boleto (borrado lógico)'}) remove(@Param('id',ParseIntPipe) id:number) { return this.service.remove(id); }

}