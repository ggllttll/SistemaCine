import { IsString, IsInt, IsNumber, IsEmail, IsDateString, IsIn, IsArray, IsOptional, Min } from 'class-validator';
export class CreatePeliculaDto {
 @IsString()
 titulo: string;

 @IsString()
 sinopsis: string;

 @IsInt()
 @Min(1)
 duracionMin: number;

 @IsString()
 @IsIn(['ATP', '+13', '+18'])
 clasificacion: string;

 @IsOptional()
 @IsArray()
 @IsInt({each:true})
 idGeneros: number[];

}