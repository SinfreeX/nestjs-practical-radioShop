import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryModel } from "./category.model";
import { ProductsModel } from "../../products.model";


interface SubcategoryCreationAttrs{
  name: string
  categoryId: number
}

@Table({tableName: 'subcategory', createdAt:false, updatedAt:false})
export class SubcategoryModel extends Model<SubcategoryModel, SubcategoryCreationAttrs>{

  @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
  id: number


  @ApiProperty({example: 'Керамические конденсаторы', description: 'Название подкатегории'})
  @Column({type: DataType.STRING, unique:true, allowNull:false})
  name: string

  @ForeignKey(() => CategoryModel)
  @Column({type: DataType.INTEGER})
  categoryId: number

  @BelongsTo(()=> CategoryModel)
  category: CategoryModel

  @HasMany(() => ProductsModel)
  products: ProductsModel[]
}