import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { AttributeModel } from "./attribute.model";
import { MeasureModel } from "../measures/measure.model";


@Table({tableName: 'attribute_measure', createdAt: false, updatedAt: false})
export class AttributeMeasureModel extends Model<AttributeMeasureModel> {
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
  id: number

  @ForeignKey(() => AttributeModel)
  @Column({type: DataType.INTEGER})
  attribute_id: number

  @ForeignKey(() => MeasureModel)
  @Column({type: DataType.INTEGER})
  measure_id: number


}