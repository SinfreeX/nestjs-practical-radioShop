import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MeasureModel } from "./measure.model";
import { MeasureDto } from "./dto/measure.dto";
import { QueryEntities } from "./dto/QueryEntities.dto";
import { AttributeModel } from "../models/attribute.model";
import { where } from "sequelize";
import { AttributeMeasureModel } from "../models/attribute-measure.model";

@Injectable()
export class MeasuresService {
  constructor(@InjectModel(MeasureModel) private measureRepository: typeof MeasureModel,
              @InjectModel(AttributeModel) private attrRepo: typeof AttributeModel,
              @InjectModel(AttributeMeasureModel) private  attrMeasureRepo: typeof AttributeMeasureModel) {}

  async create(dto: MeasureDto) {
    if (!('attrName' in dto)){
      const measure = await this.measureRepository.create(dto)
      return measure
    }
    const attr = await this.attrRepo.findOne({where: {name: dto.attrName}})
    if (!attr) throw new HttpException(`Характеристика ${dto.attrName} не существует`, HttpStatus.NOT_FOUND)

    const measure = await this.measureRepository.create({name: dto.name})
      .catch(() => { throw new HttpException(`Единица измерения ${dto.name} уже существует`, HttpStatus.CONFLICT) })

    await this.attrMeasureRepo.create({measure_id: measure.id, attribute_id: attr.id})
    return measure
  }

  async edit(dto: MeasureDto) {
    const measure = await this.measureRepository.findOne({where:{name: dto.name}})
    if (measure){
      if ('attrName' in dto){
        const attr = await this.attrRepo.findOne({where: {name: dto.attrName}})
        if (!attr) throw new HttpException(`Характеристика ${dto.attrName} не существует`, HttpStatus.NOT_FOUND)
        await this.attrMeasureRepo.create({measure_id: measure.id, attribute_id: attr.id})
      }
      if (dto.name !== measure.name) return await measure.update(dto)
      return
    }
    throw new HttpException('Единица измерения не найдена', HttpStatus.NOT_FOUND)
  }

  async getAll() {
    const measure = await this.measureRepository.findAll()
    return measure
  }

  async getOneByValue(name: string) {
    const measure = await this.measureRepository.findOne({where:{name}})
    if (measure) return measure
    throw new HttpException('Единица измерения не найдена', HttpStatus.NOT_FOUND)
  }

  async getOneById(id) {
    const measure = await this.measureRepository.findByPk(id)
    if (measure){
      return measure
    }
    throw new HttpException('Единица измерения не найдена', HttpStatus.NOT_FOUND)
  }

  async delete(id: number) {
    const measure = await this.measureRepository.destroy({where:{id:id}})
    return measure
  }



  async search(query: QueryEntities) {
    if (query.in === 'attr'){
      const attr = await this.attrRepo.findOne({
        where:{
          name: query.word
        },
        include: [{
          model: MeasureModel
        }]
      })
      if (attr && attr.measures) return [...attr.measures.map((e) => ({id: e.id, name: e.name}))]
      throw new HttpException(`Характеристика ${query.word} не существует`, HttpStatus.NOT_FOUND)
    }
    throw new HttpException(`Неизвестная область поиска - ${query.in}`, HttpStatus.BAD_REQUEST)
  }
}