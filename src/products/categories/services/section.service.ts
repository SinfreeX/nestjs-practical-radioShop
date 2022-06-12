import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SectionModel } from "../models/section.model";
import { CategoryDto } from "../dto/category.dto";
import { CategoryModel } from "../models/category.model";
import { SubcategoryModel } from "../models/subcategory.model";

@Injectable()
export class SectionService {
  constructor(@InjectModel(SectionModel) private sectionRepository: typeof SectionModel){}


  async getAll() {
    const sections = this.sectionRepository.findAll<SectionModel>({
      include:[{
        model: CategoryModel,
        include: [{
          model: SubcategoryModel
        }]
      }]
    })
    return sections
  }

  async getOneByName(name: string){
    const section = this.sectionRepository.findOne({where:{name}})
    if (section){
      return section
    }
    throw new HttpException(`Раздел ${name} не найден`, HttpStatus.NOT_FOUND)
  }

  async create(dto) {
    if (!await this.sectionRepository.findOne({where: {name: dto.name}})) {
      const section = await this.sectionRepository.create({name: dto.name})
      return section
    }
    throw new HttpException(`Раздел ${dto.name} уже существует`, HttpStatus.CONFLICT)
  }

  async update(name: string, dto: CategoryDto) {
    const section = await this.getOneByName(name)
    return await section.update(dto)
  }

  async delete(name: string) {
    const section = await this.getOneByName(name)
    return await section.destroy()
  }
}