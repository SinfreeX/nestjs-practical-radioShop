import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { UpFilesModel } from "./upFiles.model";
import {v4 as uuid} from 'uuid'
import * as path from 'path'
import * as fs from 'fs'
import * as sharp from 'sharp'
import { where } from "sequelize";

@Injectable()
export class UpFilesService {
  constructor(@InjectModel(UpFilesModel) private filesRepository: typeof UpFilesModel) {}

  async create(file: Express.Multer.File) {
    const fileName = uuid() + '.webp'
    let fullImg, compressedImg
    try {
      const filePath = path.resolve(__dirname, '../..', 'static/img/')
      if(!fs.existsSync(filePath)) fs.mkdirSync(filePath, {recursive:true})
      const compressedFilePath = path.resolve(filePath, '', 'compressed/')
      if(!fs.existsSync(compressedFilePath)) fs.mkdirSync(compressedFilePath, {recursive:true})
      fullImg = await sharp(file.buffer).webp({ quality: 80}).toFile(filePath + '/' + fileName)
      compressedImg = await sharp(file.buffer).webp({ quality: 40}).resize(320, 240).toFile(compressedFilePath + '/' + fileName)

    }catch (e) {
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    if (fullImg && compressedImg)
    return await this.filesRepository.create({
        name: fileName,
        fullSize: fullImg.size.toString(),
        compressedSize: compressedImg.size.toString()
    })
  }

  delete(name: string) {
    const filePath = path.resolve(__dirname, '../..', 'static/img/')
    fs.unlinkSync(`${filePath}/${name}`)
    fs.unlinkSync(`${filePath}/compressed/${name}`)
    return this.filesRepository.destroy({where: {name}})
  }



  // async clean() {
  //   const trash = await this.filesRepository.findAll({where: {product_id: null}})
  //   console.log(trash)
  // }

  async getLost() {
    return await this.filesRepository.findAll({where: {product_id: null}})
  }
}