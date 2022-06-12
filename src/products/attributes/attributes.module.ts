import { Module } from '@nestjs/common';
import { AttributesController } from "./attributes.controller";
import { AttributesService } from "./attributes.service";
import { SequelizeModule } from "@nestjs/sequelize";
import {  AttributeModel } from "./models/attribute.model";
import { AttributeMeasureModel } from "./models/attribute-measure.model";
import { MeasureModel } from "./measures/measure.model";
import { MeasuresService } from "./measures/measures.service";
import { ProductsService } from "../products.service";
import { ProductsModel } from "../products.model";
import { AttributeValService } from "../attributeVal.service";
import { AttributeValModel } from "../attributeVal.model";

@Module({
  providers: [AttributesService, MeasuresService, AttributeValService, ProductsService],
  controllers: [AttributesController],
  imports: [SequelizeModule.forFeature([
    AttributeModel,
    AttributeMeasureModel,
    MeasureModel,
    ProductsModel,
    AttributeValModel
  ])],
  exports: [
    AttributesService
  ]
})
export class AttributesModule {}
