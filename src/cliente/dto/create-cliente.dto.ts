import { IsString, IsInt, IsNumber, IsEmail, IsDateString, IsIn, IsArray, IsOptional, Min } from 'class-validator';
export class CreateClienteDto {
 @IsString()
 nombres: string;

 @IsString()
 paterno: string;

 @IsOptional()
 @IsString()
 materno: string;

 @IsEmail()
 email: string;

}