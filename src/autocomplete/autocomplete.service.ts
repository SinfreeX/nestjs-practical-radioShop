import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProductsModel } from "../products/products.model";
import { Op, where } from "sequelize";
import { unique } from "sequelize-typescript/dist/shared/array";
import { Sequelize } from "sequelize-typescript";
import { AttributeModel } from "../products/attributes/models/attribute.model";
import { AttributeMeasureModel } from "../products/attributes/models/attribute-measure.model";
import { MeasureModel } from "../products/attributes/measures/measure.model";

@Injectable()
export class AutocompleteService {
  constructor(@InjectModel(ProductsModel) private productRepository: typeof ProductsModel,
              @InjectModel(AttributeModel) private attrRepository: typeof AttributeModel,
              @InjectModel(MeasureModel) private measureRepo: typeof MeasureModel
              ) {}

  private unicalizer (namesArr, reqWord) {
    let words = namesArr.map(el => el.name).join(' ').replace(/,/g,' ').toLowerCase().split(' ')
    let result = words.filter(word => String(word).startsWith(reqWord.toLowerCase()))
    if (result.length < 10){
      result.push(...words.filter(word => String(word).includes(reqWord.toLowerCase())))
    }
    return [...new Set(result)]
  }

  async searchProductsNames(word: string) {
    return this.unicalizer(
            await this.productRepository.findAll({
              where: {name: {[Op.substring]: word }}, attributes: ['name']
            })
      , word)
  }

//Op.substring


 async searchVendorsNames(word: string) {
    const result = await this.productRepository.findAll({
      where: {
        manufacturer: {
          [Op.substring]: word
        }
      },
      attributes: [[
        Sequelize.fn(
          'DISTINCT',
          Sequelize.col('manufacturer')),
        'manufacturer'
      ]]
    })
    return [...result.map(el => el.manufacturer)]
  }

 async searchAttrsNames(word: string) {
    const result = await  this.attrRepository.findAll({
      where: {
        name: {
          [Op.substring]: word
        }
      }
    })
   return [...result.map(el => el.name)]
  }

  async MeasuresNamesInAttr(word: string) {
    if (word == '*'){
      const result = await this.measureRepo.findAll()
      return [...result.map(el => el.name)]
    }
    const attr = await this.attrRepository.findOne({
      where:{
        name: word
      },
      include: [{
        model: MeasureModel
      }]
    })
    if (attr && attr.measures) {
      return [...attr.measures.map((e) => e.name)]
    }else {
      throw new HttpException(`Характеристика ${word} не существует`, HttpStatus.NOT_FOUND)
    }
  }
}