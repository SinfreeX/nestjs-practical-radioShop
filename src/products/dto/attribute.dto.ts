import { IsNumber, IsString } from "class-validator";

export class AttributeDto {
  @IsString({message: "Должно быть строкой"})
  value : string

  @IsString({message: "Должно быть строкой"})
  attribute : string

  @IsString({message: "Должно быть строкой"})
  measure : string

}