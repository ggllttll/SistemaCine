import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { AppModule } from './app.module.js';
async function bootstrap(){
 const app=await NestFactory.create(AppModule);
 app.setGlobalPrefix('api');
 app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true,transform:true}));
 const config=new DocumentBuilder().setTitle('Sistema de Gestión de Cine').setDescription('API REST para administrar salas, películas, géneros, funciones, clientes y venta de boletos.').setVersion('1.0').build();
 const document=SwaggerModule.createDocument(app,config);
 SwaggerModule.setup('docs',app,document);
 app.use('/reference',apiReference({content:document,theme:'elysiajs'}));
 await app.listen(process.env.PORT||3001);
}
bootstrap();