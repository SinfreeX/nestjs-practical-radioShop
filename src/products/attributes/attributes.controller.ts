import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { AttributesService } from "./attributes.service";
import { AttributeDto } from "./dto/attribute.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AttributeModel } from "./models/attribute.model";

@ApiTags("Контроллер динамических характеристик товара")
@Controller('/attributes')
export class AttributesController { constructor(private attributeService: AttributesService) {}


  @ApiOperation({summary: 'Создать характеристику'})
  @ApiResponse({status: HttpStatus.OK, type: AttributeModel})
  @Post()
  create(@Body() dto: AttributeDto) {
    return this.attributeService.create(dto)
  }

  @ApiOperation({summary: 'Получить все характеристики'})
  @ApiResponse({status: HttpStatus.OK, type: AttributeModel})
  @Get()
  getAll(@Query() dto: AttributeDto) {
    return this.attributeService.get(dto)
  }

  @ApiOperation({summary: 'Получить характеристику'})
  @ApiResponse({status: HttpStatus.OK, type: AttributeModel})
  @Get('/id/:id')
  getOne(@Param('id', ParseIntPipe)id: number) {
    return this.attributeService.getOneById(id)
  }

  @ApiOperation({summary: 'Изменить имя характеристики'})
  @ApiResponse({status: HttpStatus.OK, type: AttributeModel})
  @Put('/id/:id')
  edit(@Body() dto: AttributeDto, @Param('id', ParseIntPipe)id: number) {
    return this.attributeService.edit(id, dto)
  }

  @ApiOperation({summary: 'Удаление характеристику'})
  @ApiResponse({status: HttpStatus.OK, type: Boolean})
  @Delete('/id/:id')
  delete(@Param('id', ParseIntPipe)id: number) {
    return this.attributeService.delete(id)
  }

}
