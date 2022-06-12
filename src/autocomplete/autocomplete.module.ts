import { Module } from "@nestjs/common";
import { ProductsModel } from "../products/products.model";
import { AutocompleteService } from "./autocomplete.service";
import { AutocompleteController } from "./autocomplete.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { AttributeModel } from "../products/attributes/models/attribute.model";
import { MeasureModel } from "../products/attributes/measures/measure.model";


@Module({
  controllers: [AutocompleteController],
  providers: [AutocompleteService],
  imports: [SequelizeModule.forFeature([
    ProductsModel, AttributeModel, MeasureModel
  ])]
})
export class AutocompleteModule {}