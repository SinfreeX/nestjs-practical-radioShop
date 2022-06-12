import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { MeasureModel } from "./attributes/measures/measure.model";
import { ProductsModel } from "./products.model";
import { AttributeModel } from "./attributes/models/attribute.model";


@Table({tableName:'attributevalue', createdAt: false, updatedAt: false})
export class AttributeValModel extends Model<AttributeValModel> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
  id: number

  @Column({type: DataType.STRING, allowNull:false})
  value: string

  @ForeignKey(() => MeasureModel)
  @Column({type: DataType.INTEGER})
  measure_id: number
  @BelongsTo(() => MeasureModel)
  measures: MeasureModel[]

  @ForeignKey(() => AttributeModel)
  @Column({type: DataType.INTEGER})
  attribute_id: number
  @BelongsTo(() => AttributeModel)
  attribute: AttributeModel

  @ForeignKey(() => ProductsModel)
  @Column({type: DataType.INTEGER})
  product_id: number
  @BelongsTo(() => ProductsModel)
  product: ProductsModel
}