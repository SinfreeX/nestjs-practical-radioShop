import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AttributesService } from "./attributes/attributes.service";
import { MeasuresService } from "./attributes/measures/measures.service";
import { ProductsService } from "./products.service";
import { AttributeDto } from "./dto/attribute.dto";
import { AttributeValModel } from "./attributeVal.model";
import { MeasureModel } from "./attributes/measures/measure.model";
import { AttributeModel } from "./attributes/models/attribute.model";


@Injectable()
export class AttributeValService {
  constructor(
     @InjectModel(AttributeValModel) private attributeRepository: typeof AttributeValModel,
               private attributesService: AttributesService,
               private measuresService: MeasuresService,
               private productsService: ProductsService
  ) {}

  async create(id: number, dto: AttributeDto){
      const attribute = await this.attributesService.getOneByValue(dto.attribute)
      const measure = await this.measuresService.getOneByValue(dto.measure)
      await this.productsService.getOneById(id)
      if (!await this.attributeRepository.findOne({ where: { attribute_id: attribute.id, product_id: id } })) {
        const attributeValue = await this.attributeRepository.create({
          value: dto.value,
          attribute_id: attribute.id,
          measure_id: measure.id,
          product_id: id
        })
        return attributeValue
      }
      throw new HttpException('Значение для данной характеристики уже задано', HttpStatus.NOT_FOUND)
  }

  async update(id: number, attributeId: number, dto: AttributeDto) {
    const attributeVal = await this.attributeRepository.findByPk(attributeId)
    if (attributeVal){
      const attribute = await this.attributesService.getOneByValue(dto.attribute)
      const  measure = await this.measuresService.getOneByValue(dto.measure)
      await this.productsService.getOneById(id)

      return await attributeVal.update({
        value: dto.value,
        measure_id: measure.id,
        attribute_id: attribute.id,
        product_id: id
      })
    }
    throw new HttpException('Изменяемое значение характеристики не найдено', HttpStatus.NOT_FOUND)
  }

  async delete(attributeId: number) {
    const attribute = await this.attributeRepository.destroy({where:{id: attributeId}})
    return attribute
  }

  async getAllByProductId(id: number) {
    const attributes = await this.attributeRepository.findAll({where:{product_id: id}, include:[MeasureModel, AttributeModel]})
    if (attributes){
      return attributes
    }
    throw new HttpException("У продукта нет характеристик", HttpStatus.NOT_FOUND)
  }
}