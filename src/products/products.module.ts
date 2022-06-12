import { Module } from '@nestjs/common';
import { ProductsModel } from "./products.model";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { AttributeModel } from "./attributes/models/attribute.model";
import { AttributeValModel } from "./attributeVal.model";
import { AttributeValService } from "./attributeVal.service";
import { AttributesService } from "./attributes/attributes.service";
import { MeasuresService } from "./attributes/measures/measures.service";
import { MeasureModel } from "./attributes/measures/measure.model";
import { AttributeMeasureModel } from "./attributes/models/attribute-measure.model";

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, AttributeValService, AttributesService, MeasuresService],
  imports: [SequelizeModule.forFeature([
    ProductsModel,
    AttributeModel,
    AttributeValModel,
    MeasureModel,
    AttributeMeasureModel
  ])],
  exports: [ProductsService]
})
export class ProductsModule {}
