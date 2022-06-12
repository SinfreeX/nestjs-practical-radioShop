import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class addAnyTypeCategoryDto {

  @ApiProperty({example: 'section | category | subcategory', description: 'type creating entity'})
  @IsString({message: 'Должно быть строкой'})
  readonly type: string

  @ApiProperty({example: 'Конденсаторы', description: 'name creating entity'})
  @IsString({message: 'Должно быть строкой'})
  readonly name: string

  @ApiProperty({example: 'Детали', description: 'name parent section [optional]'})
  // @IsString({message: 'Должно быть строкой'})
  readonly parentSection?: string

  @ApiProperty({example: 'Резисторы', description: 'name parent category [optional]'})
  // @IsString({message: 'Должно быть строкой'})
  readonly parentCategory?: string

}