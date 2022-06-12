import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { MeasureModel } from "../measures/measure.model";
import { AttributeMeasureModel } from "./attribute-measure.model";
import { AttributeValModel } from "../../attributeVal.model";



@Table({tableName: 'attributes', createdAt: false, updatedAt: false})
export class AttributeModel extends Model<AttributeModel> {

  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
  id: number

  @Column({type: DataType.STRING, unique:true, allowNull:false})
  name: string

  @HasMany(() => AttributeValModel)
  values: AttributeValModel[]

  @BelongsToMany(() => MeasureModel, () => AttributeMeasureModel)
  measures: MeasureModel[]

}