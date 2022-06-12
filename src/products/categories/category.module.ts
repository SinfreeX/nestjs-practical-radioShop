import { Module } from "@nestjs/common";
import { CategoryService } from "./services/category.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryModel } from "./models/category.model";
import { CategoryController } from "./category.controller";
import { SubcategoryModel } from "./models/subcategory.model";
import { SubcategoryService } from "./services/subcategory.service";
import { SectionService } from "./services/section.service";
import { SectionModel } from "./models/section.model";


@Module({
  providers: [CategoryService, SubcategoryService, SectionService],
  controllers: [CategoryController],
  imports: [SequelizeModule.forFeature([
    CategoryModel,
    SubcategoryModel,
    SectionModel
  ]
  )],
  exports: [
    CategoryService
  ]
})
export class CategoryModule {}