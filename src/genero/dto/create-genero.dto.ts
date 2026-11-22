import { IsString, IsInt, IsNumber, IsEmail, IsDateString, IsIn, IsArray, IsOptional, Min } from 'class-validator';
export class CreateGeneroDto {
 @IsString()
 nombre: string;

 @IsString()
 descripcion: string;

}