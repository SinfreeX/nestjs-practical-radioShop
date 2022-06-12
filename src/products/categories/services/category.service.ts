import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CategoryModel } from "../models/category.model";
import { CategoryDto } from "../dto/category.dto";
import { SectionModel } from "../models/section.model";
import { SectionService } from "./section.service";
import { addAnyTypeCategoryDto } from "../dto/addAnyTypeCategory.dto";



@Injectable()
export class CategoryService {
  constructor(@InjectModel(CategoryModel) private categoryRepository: typeof CategoryModel,
              private sectionService: SectionService) {
  }


  async getOneByName(sectionName: string, categoryName: string) {
    const section = await this.sectionService.getOneByName(sectionName)
    const category = await this.categoryRepository.findOne({ where: { name: categoryName, sectionId: section.id } })
    if (category) {
      return category
    }
    throw new HttpException(`Категория ${categoryName} не найдена в разделе ${sectionName}`, HttpStatus.NOT_FOUND)
  }

  async create(dto: addAnyTypeCategoryDto) {
    const section = await this.sectionService.getOneByName(dto.parentSection)
    const duplicate = await this.categoryRepository.findOne({ where: { name: dto.name }, include:{model: SectionModel} })
    if (!duplicate) {
      await this.categoryRepository.create({name: dto.name, sectionId: section.id})
    }
    else {
      throw new HttpException(`Категория ${dto.name} уже существует в разделе ${duplicate.section.name}`, HttpStatus.CONFLICT)
    }
  }

  async update(params, dto: CategoryDto) {
    const category = await this.getOneByName(params.section, params.category)
    return await category.update(dto)
  }

  async delete(params) {
    const category = await this.getOneByName(params.section, params.category)
    return await category.destroy()
  }
}