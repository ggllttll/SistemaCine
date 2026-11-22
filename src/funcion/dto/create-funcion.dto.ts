import { IsString, IsInt, IsNumber, IsEmail, IsDateString, IsIn, IsArray, IsOptional, Min } from 'class-validator';
export class CreateFuncionDto {
 @IsInt()
 @Min(1)
 idSala: number;

 @IsInt()
 @Min(1)
 idPelicula: number;

 @IsDateString()
 fechaHora: string;

 @IsNumber()
 @Min(0)
 precio: number;

}