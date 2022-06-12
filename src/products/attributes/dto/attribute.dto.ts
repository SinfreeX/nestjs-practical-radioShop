import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class AttributeDto {

  @ApiProperty({example: 'Размер', description: 'Название характеристики товара'})
  // @IsString({message: 'Должно быть строкой'})
  readonly name: string

}