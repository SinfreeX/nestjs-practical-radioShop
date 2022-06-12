import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";


export class MeasureDto {

  @ApiProperty({example: 'метр', description: 'Единица измерения'})
  @IsString({message: 'Должно быть строкой'})
  readonly name: string

  @ApiProperty({example: 'Длина', description: 'Характеристика к которой пренадлежит создаваемая единица измерения'})
  readonly attrName?: string

}