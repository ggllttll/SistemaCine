import { IsArray, IsInt, Min, ArrayNotEmpty } from 'class-validator';

export class AsignarGenerosDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Min(1, { each: true })
  idGeneros: number[];
}
