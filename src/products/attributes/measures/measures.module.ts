import { Module } from "@nestjs/common";
import { MeasuresService } from "./measures.service";
import { MeasuresController } from "./measures.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MeasureModel } from "./measure.model";
import { AttributeModel } from "../models/attribute.model";
import { AttributeMeasureModel } from "../models/attribute-measure.model";


@Module({
  providers: [MeasuresService],
  controllers: [MeasuresController],
  imports: [SequelizeModule.forFeature([MeasureModel, AttributeModel, AttributeMeasureModel])],
  exports: [MeasuresService]
})

export class MeasuresModule {}