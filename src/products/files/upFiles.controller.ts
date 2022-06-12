import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Get, HttpStatus, Post, Req, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UpFilesModel } from "./upFiles.model";
import { UpFilesService } from "./upFiles.service";
import { FileInterceptor } from "@nestjs/platform-express";


@ApiTags("Контроллер файлов")
@Controller('/files')
export class UpFilesController {
  constructor(private upFilesService: UpFilesService) {}

  @Get()
  getLost() {
    return this.upFilesService.getLost()
  }

  @ApiOperation({summary: 'Загрузить файл'})
  @ApiResponse({status: HttpStatus.OK, type: UpFilesModel})
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.upFilesService.create(file)
    // return this.attributeService.create(dto)
  }


  @Delete()
  deleteFile(@Body() {name}) {
    return this.upFilesService.delete(name)
  }

}