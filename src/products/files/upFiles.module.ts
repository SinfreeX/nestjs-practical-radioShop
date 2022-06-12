import { Module } from "@nestjs/common";
import { UpFilesController } from "./upFiles.controller";
import { UpFilesService } from "./upFiles.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UpFilesModel } from "./upFiles.model";


@Module({
  controllers: [UpFilesController],
  providers: [UpFilesService],
  imports: [SequelizeModule.forFeature([
    UpFilesModel
  ])],
  exports: [UpFilesService]
})

export class UpFilesModule {}