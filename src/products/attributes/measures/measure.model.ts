import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { AttributeModel } from "../models/attribute.model";
import { AttributeMeasureModel } from "../models/attribute-measure.model";
import { ApiProperty } from "@nestjs/swagger";
import { AttributeValModel } from "../../attributeVal.model";


@Table({tableName: 'measures', createdAt: false, updatedAt: false})
export class MeasureModel extends Model<MeasureModel> {

  @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
  id: number

  @ApiProperty({example: 'градус', description: 'Единица измерения'})
  @Column({type: DataType.STRING, unique:true, allowNull:false})
  name: string

  @HasMany(() => AttributeValModel)
  attributevalues: AttributeValModel[]

  @BelongsToMany(() => AttributeModel, () => AttributeMeasureModel)
  attributes: AttributeModel[]
}