import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AttributeModel } from "./models/attribute.model";
import { AttributeDto } from "./dto/attribute.dto";
import { MeasuresService } from "./measures/measures.service";
import { MeasureModel } from "./measures/measure.model";
import { ProductsService } from "../products.service";

@Injectable()
export class AttributesService {

  constructor(@InjectModel(AttributeModel) private attributeRepository: typeof AttributeModel,
             private measureService: MeasuresService,
             @InjectModel(MeasureModel) private measureModel: typeof MeasureModel,
              private productService: ProductsService
  ) {}
 @InjectModel(MeasureModel) private measure: typeof MeasureModel
  //дописывай добавление атрибутов к товару в контроллере товра


  async create(dto: AttributeDto) {
    const attribute = await this.attributeRepository.create(dto)
    return attribute
  }


  async get(dto: AttributeDto) {
    const where = ('name' in dto) ? {name: dto.name} : {}
    console.log(dto)
    const attribute = await this.attributeRepository.findAll({
      where
      // include:{
      //   model:this.measureModel
      // }
    })
    if (attribute.length) return attribute
    throw new HttpException('Характеристика не найдена', HttpStatus.NOT_FOUND)
  }

  async getOneById(id: number) {
    const attribute = await this.attributeRepository.findByPk(id)
    if (attribute){
      return attribute
    }
    throw new HttpException('Характеристика не найдена', HttpStatus.NOT_FOUND)
  }

  async getOneByValue(name: string) {
    const attribute = await this.attributeRepository.findOne({where:{name}})
    if (attribute){
      return attribute
    }
    throw new HttpException('Характеристика не найдена', HttpStatus.NOT_FOUND)
  }

  async edit(id: number, dto: AttributeDto) {
    const attribute = await this.attributeRepository.findByPk(id)
    if (attribute){
      return await attribute.update({name: dto.name})
    }
    throw new HttpException('Характеристика не найдена', HttpStatus.NOT_FOUND)
  }

  async delete(id) {
      const attribute = await this.attributeRepository.destroy({ where: { id: id } })
      return attribute
  }



}
