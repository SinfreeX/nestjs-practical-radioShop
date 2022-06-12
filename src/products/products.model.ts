import { BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "../users/users.model";
import { AttributeValModel } from "./attributeVal.model";
import { CategoryModel } from "./categories/models/category.model";
import { SubcategoryModel } from "./categories/models/subcategory.model";

@Table({tableName:'products'})
export class ProductsModel extends Model<ProductsModel>{
  @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
  @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'kt311', description: 'Наименование товара'})
  @Column({type:DataType.STRING})
  name: string

  @ApiProperty({example: 135, description: 'Остаток на складе'})
  @Column({type:DataType.INTEGER})
  availability: number

  @ApiProperty({example: 1200, description: 'Цена за единицу товара'})
  @Column({type:DataType.INTEGER})
  price: number

  @ApiProperty({example: 17100, description: 'Номенклатурный номер'})
  @Column({type:DataType.INTEGER})
  nomenclature: number

  @ApiProperty({example: 'JNE2D152M10003000500', description: 'Код производителя'})
  @Column({type:DataType.STRING})
  vendorCode: string

  @ApiProperty({example: 'JB', description: 'Производитель/бренд'})
  @Column({type:DataType.STRING})
  manufacturer: string

  @ApiProperty({example: true, description: 'Есть ли в наличии?'})
  @Column({type:DataType.BOOLEAN})
  order: boolean

  @ApiProperty({example: 15, description: 'время доставки в днях'})
  @Column({type:DataType.INTEGER})
  deliveryTime: number

  @ForeignKey(() => CategoryModel)
  @Column({type: DataType.INTEGER})
  category_id: number

  @ForeignKey(() => SubcategoryModel)
  @Column({type: DataType.INTEGER})
  subcategory_id: number

  @HasMany(() => AttributeValModel)
  attributes: AttributeValModel[]


}