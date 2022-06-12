import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ProductDto } from "./dto/product.dto";
import { ProductsService } from "./products.service";
import { ProductsModel } from "./products.model";
import { AttributeDto } from "./dto/attribute.dto";
import { AttributeValService } from "./attributeVal.service";

@ApiTags('Контроллер товаров')
@Controller('products')
export class ProductsController {

  constructor(private productsService: ProductsService,
              private attributeService: AttributeValService) {}


  @ApiOperation({summary: 'Получить список всех товаров'})
  @ApiResponse({status: HttpStatus.OK, type: ProductsModel})
  @Get()
  getAll(){
    return this.productsService.getAll()
  }

  @ApiOperation({summary: 'Получить товар и все его характеристики'})
  @Get(':id')
  getOneById(@Param('id', ParseIntPipe)id: number ){
    return this.productsService.getOneById(id)
  }

  @ApiOperation({summary: 'Получить товар по категории'})
  @Get('/category/:category')
  getByCategory(@Param('category') category: string){
    return this.productsService.getByCategory(category)
  }

  @ApiOperation({summary: 'Добавить новый товар'})
  @Post()
  create(@Body() dto: ProductDto){
    return this.productsService.create(dto)
  }


  @ApiOperation({summary: 'Обновить товар'})
  @Put('/:id')
  updateById(@Param('id', ParseIntPipe)id: number){
    return this.productsService.edit(id)
  }

  @ApiOperation({summary: 'Удалить товар'})
  @Delete('/:id')
  deleteById(@Param('id', ParseIntPipe)id: number){
    return this.productsService.delete(id)
  }

  @ApiOperation({summary: 'Получить все характеристики товара'})
  @Get(':id/attributes')
  getAllAttributeByProductId(@Param('id', ParseIntPipe) id: number){
    return this.attributeService.getAllByProductId(id)
  }

  @ApiOperation({summary: 'Добавить значение атрибута товара'})
  @Post(':id/attributes')
  addAttribute(@Body() dto: AttributeDto, @Param('id', ParseIntPipe) id: number){
    return this.attributeService.create(id, dto)
  }

  @ApiOperation({summary: 'Обновить значение атрибута товара'})
  @Put(':id/attributes/:attributeId')
  updateAttribute(@Body() dto: AttributeDto,
                  @Param('id', ParseIntPipe) id: number,
                  @Param('attributeId', ParseIntPipe) attributeId: number){
    return this.attributeService.update(id, attributeId, dto)
  }

  @ApiOperation({summary: 'Удалить значение атрибута товара'})
  @Delete(':id/attributes/:attributeId')
  deleteAttribute(@Param('attributeId', ParseIntPipe) attributeId: number){
    return this.attributeService.delete(attributeId)
  }

}
