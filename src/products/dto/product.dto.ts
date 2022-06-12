import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ProductDto {

  @IsString({message: "Должно быть строкой"})
  name : string

  @IsNumber({},{message: "Должно быть числом"})
  availability : number

  @IsNumber({},{message: "Должно быть числом"})
  price: number

  @IsNumber({},{message: "Должно быть числом"})
  nomenclature: number

  @IsString({message: "Должно быть строкой"})
  vendorCode: string

  @IsString({message: "Должно быть строкой"})
  manufacturer: string

  @IsBoolean({message: "Должно быть boolean"})
  order: boolean

  @IsNumber({},{message: "Должно быть числом"})
  deliveryTime: number


}