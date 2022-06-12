import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { ProductsModel } from "../products.model";

interface FileUploadCreation{
  name: string
  fullSize: string
  compressedSize: string
}

@Table({tableName: 'files'})
export class UpFilesModel extends Model<UpFilesModel>{
  @ApiProperty({example: 1, description: 'Уникальный идентификатор'})
  @Column({type:DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number

  @ApiProperty({example: 'kt311-img.jpg', description: 'Название файла'})
  @Column({type:DataType.STRING, unique: true})
  name: string

  @ApiProperty({example: '320120', description: 'Размер файла в байтах'})
  @Column({type:DataType.STRING})
  fullSize: string

  @ApiProperty({example: '3220', description: 'Размер сжатого файла в байтах'})
  @Column({type:DataType.STRING})
  compressedSize: string

  @ForeignKey(() => ProductsModel)
  @Column({type: DataType.INTEGER})
  product_id: number
}