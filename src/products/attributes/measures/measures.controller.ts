import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { MeasureDto } from "./dto/measure.dto";
import { MeasuresService } from "./measures.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MeasureModel } from "./measure.model";
import { QueryEntities } from "./dto/QueryEntities.dto";

@ApiTags('Контроллер единиц измерения')
@Controller('/attributes/measures')
export class MeasuresController {
  constructor(private measuresService: MeasuresService) {}

  @ApiOperation({summary: 'Получить все'})
  @ApiResponse({status: HttpStatus.OK, type: MeasureModel})
  @Get()
  get(@Query() query: QueryEntities) {
    if (!query.in) return this.measuresService.getAll()
    return this.measuresService.search(query)
  }

  @ApiOperation({summary: 'Получить все'})
  @ApiResponse({status: HttpStatus.OK, type: MeasureModel})
  @Get('/search')
  search(@Query() param) {
    console.log(param)
    // return this.measuresService.search()
  }


  @ApiOperation({summary: 'Получить единицу измерения'})
  @ApiResponse({status: HttpStatus.OK, type: MeasureModel})
  @Get('/id/:id')
  getOne(@Param() params) {
    return this.measuresService.getOneById(params.id)
  }

  @ApiOperation({summary: 'Создание единицы измерения'})
  @ApiResponse({status: HttpStatus.CREATED, type: MeasureModel})
  @Post()
  create(@Body() dto: MeasureDto) {
    return this.measuresService.create(dto)
  }

  @ApiOperation({summary: 'Изменение единицы измерения'})
  @ApiResponse({status: HttpStatus.OK, type: MeasureModel})
  @Put()
  edit(@Body() dto: MeasureDto) {
    return this.measuresService.edit(dto)
  }

  @ApiOperation({summary: 'Удаление единицы измерения'})
  @ApiResponse({status: HttpStatus.OK, type: Boolean})
  @Delete('/id/:id')
  delete(@Body() dto: MeasureDto, @Param('id', ParseIntPipe) id: number) {
    return this.measuresService.delete(id)
  }
}