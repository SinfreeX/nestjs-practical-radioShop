import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { SubcategoryModel } from "./subcategory.model";
import { SectionModel } from "./section.model";
import { ProductsModel } from "../../products.model";


interface CategoryCreationAttrs {
  name: string
  sectionId: number
}

@Table({tableName: 'category', createdAt: false, updatedAt: false})
export class CategoryModel extends Model<CategoryModel, CategoryCreationAttrs>{

  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
  id: number

  @Column({type: DataType.STRING, unique:true, allowNull:false})
  name: string

  @ForeignKey(() => SectionModel)
  @Column({type: DataType.INTEGER})
  sectionId: number

  @BelongsTo(() => SectionModel)
  section: SectionModel

  @HasMany(() => SubcategoryModel)
  subcategories: SubcategoryModel[]

  @HasMany(() => ProductsModel)
  products: ProductsModel[]


}