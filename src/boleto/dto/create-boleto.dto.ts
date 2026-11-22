import { IsString, IsInt, IsNumber, IsEmail, IsDateString, IsIn, IsArray, IsOptional, Min } from 'class-validator';
export class CreateBoletoDto {
 @IsInt()
 @Min(1)
 idFuncion: number;

 @IsInt()
 @Min(1)
 idCliente: number;

 @IsInt()
 @Min(1)
 numeroAsiento: number;

 @IsOptional()
 @IsNumber()
 @Min(0)
 precioPagado: number;

}