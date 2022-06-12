import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

//dto описывающия необходимые данные для создания новой категории пользователя. /*
export class CategoryDto {

  @ApiProperty({example: 'Конденсаторы', description: 'Название категории'})
  @IsString({message: 'Должно быть строкой'})
  readonly name: string

}