import { IsString, IsInt, IsNumber, IsEmail, IsDateString, IsIn, IsArray, IsOptional, Min } from 'class-validator';
export class CreateSalaDto {
 @IsString()
 nombre: string;

 @IsInt()
 @Min(1)
 capacidad: number;

 @IsString()
 @IsIn(['2D', '3D', 'IMAX'])
 tipo: string;

}