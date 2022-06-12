import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { SubcategoryModel } from "../models/subcategory.model";
import { CategoryDto } from "../dto/category.dto";
import { SectionService } from "./section.service";
import { CategoryService } from "./category.service";
import { SectionModel } from "../models/section.model";
import { CategoryModel } from "../models/category.model";


@Injectable()
export class SubcategoryService {
  constructor(@InjectModel(SubcategoryModel) private subcategoryRepository: typeof SubcategoryModel,
              private sectionService: SectionService, private categoryService: CategoryService) {}


  async getOneByName(sectionName: string, categoryName: string, subcategoryName: string){
    const category = await this.categoryService.getOneByName(sectionName, categoryName)
    const subcategory = await this.subcategoryRepository.findOne({where:{name: subcategoryName, categoryId: category.id}})
    if (subcategory){
      return subcategory
    }
    throw new HttpException(`Подкатегория ${subcategoryName} не найдена в категории ${categoryName} раздела ${sectionName}`, HttpStatus.NOT_FOUND)
  }

  async create(dto) {
    const category = await this.categoryService.getOneByName(dto.parentSection, dto.parentCategory)
    const duplicate = await this.subcategoryRepository.findOne({where:{name: dto.name}, include:[{model: CategoryModel, include:[SectionModel]}]})
    if (!duplicate){
      return await this.subcategoryRepository.create({name: dto.name, categoryId: category.id})
    }else{
      throw new HttpException(`Подкатегория ${dto.name} уже существует в категории ${duplicate.category.name} раздела ${duplicate.category.section.name}`, HttpStatus.CONFLICT)
    }
  }

  async update(params, dto: CategoryDto) {
    const subcategory = await this.getOneByName(params.section, params.category, params.subcategory)
    return await subcategory.update(dto)
  }

  async delete(params) {
    const subcategory = await this.getOneByName(params.section, params.category, params.subcategory)
    return await subcategory.destroy()
  }
}