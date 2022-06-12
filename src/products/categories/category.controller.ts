import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put
} from "@nestjs/common";
import { CategoryService } from "./services/category.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CategoryDto } from "./dto/category.dto";
import { SectionService } from "./services/section.service";
import { SubcategoryService } from "./services/subcategory.service";
import { AttributeModel } from "../attributes/models/attribute.model";
import { SectionModel } from "./models/section.model";
import { CategoryModel } from "./models/category.model";
import { SubcategoryModel } from "./models/subcategory.model";
import { addAnyTypeCategoryDto } from "./dto/addAnyTypeCategory.dto";

@ApiTags('Контроллер категорий')
@Controller('category')
export class CategoryController{

  constructor(private categoryService: CategoryService,
              private sectionService: SectionService,
              private subcategoryService: SubcategoryService) {}


  @ApiOperation({summary: 'Получить все разделы их категории и подкатегории'})
  @ApiResponse({status: HttpStatus.OK, type: SectionModel})
  @Get()
  getAll(){
    return this.sectionService.getAll()
  }


  @Post()
  createAny(@Body() dto: addAnyTypeCategoryDto){
    switch (dto.type){
      case 'section':
        return this.sectionService.create(dto)
      case 'category':
        return this.categoryService.create(dto)
      case 'subcategory':
        return this.subcategoryService.create(dto)
      default:
        throw new HttpException(`Type entity unknown`, HttpStatus.BAD_REQUEST)
    }

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  @ApiOperation({summary: 'Создать новый раздел'})
  @ApiResponse({status: HttpStatus.CREATED, type: SectionModel})
  @Post(':section')
  createSection(@Param() params){
    return this.sectionService.create(params.section)
  }

  @ApiOperation({summary: 'Изменить существующий раздел'})
  @ApiResponse({status: HttpStatus.OK, type: SectionModel})
  @Put(':section')
  updateSection(@Body() dto: CategoryDto, @Param('section') section: string){
    return this.sectionService.update(section, dto)
  }

  @ApiOperation({summary: 'Удалить существующий раздел'})
  @ApiResponse({status: HttpStatus.OK, type: SectionModel})
  @Delete(':section')
  deleteSection(@Param('section') section: string){
    return this.sectionService.delete(section)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @ApiOperation({summary: 'Создать новую категорию в разделе'})
  @ApiResponse({status: HttpStatus.CREATED, type: CategoryModel})
  @Post(':section/:category')
  createCategory(@Param() params){
    return this.categoryService.create(params)
  }

  @ApiOperation({summary: 'Изменить существующую категорию раздела'})
  @ApiResponse({status: HttpStatus.OK, type: CategoryModel})
  @Put(':section/:category')
  updateCategory(@Body() dto: CategoryDto, @Param() params){
    return this.categoryService.update(params, dto)
  }

  @ApiOperation({summary: 'Удалить существующую категорию раздела'})
  @ApiResponse({status: HttpStatus.OK, type: CategoryModel})
  @Delete (':section/:category')
  deleteCategory(@Param() params){
    return this.categoryService.delete(params)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @ApiOperation({summary: 'Создать подкатегорию категории в разделе'})
  @ApiResponse({status: HttpStatus.CREATED, type: SubcategoryModel})
  @Post(':section/:category/:subcategory')
  createSubcategory(@Param() params){
    return this.subcategoryService.create(params)
  }

  @ApiOperation({summary: 'Изменить существующую подкатегорию категории в разделе'})
  @ApiResponse({status: HttpStatus.OK, type: SubcategoryModel})
  @Put(':section/:category/:subcategory')
  updateSubcategory(@Body() dto: CategoryDto, @Param() params){
    return this.subcategoryService.update(params, dto)
  }

  @ApiOperation({summary: 'Удалить существующую подкатегорию категории в разделе'})
  @ApiResponse({status: HttpStatus.OK, type: SubcategoryModel})
  @Delete(':section/:category/:subcategory')
  deleteSubcategory(@Param() params){
    return this.subcategoryService.delete(params)
  }

}