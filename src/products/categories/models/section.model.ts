import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { CategoryModel } from "./category.model";

interface SectionCreationAttrs {
  name: string
}

@Table({tableName: 'section', createdAt:false, updatedAt:false})
export class SectionModel extends Model<SectionModel, SectionCreationAttrs>{

  @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
  @Column({type: DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
  id: number


  @ApiProperty({example: 'Электронные компоненты', description: 'Название раздела'})
  @Column({type: DataType.STRING, unique:true, allowNull:false})
  name: string

  @HasMany(() => CategoryModel)
  categories: CategoryModel[]
}