import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Controller, Get, HttpStatus, Param, Query } from "@nestjs/common";
import { AutocompleteService } from "./autocomplete.service";


@ApiTags('Внутренний контроллер автокомплита')
@Controller('autocomplete')
export class AutocompleteController {
  constructor(private autocompleteService: AutocompleteService) {}

  @ApiOperation({summary: 'Получить массив названий товаров по ключевому слову'})
  @ApiResponse({status: HttpStatus.OK, type: Array})


  @Get()
  getNames(@Query() {type, word}){
    if (type === 'attrs') return this.autocompleteService.searchAttrsNames(word)
    if (type === 'products') return this.autocompleteService.searchProductsNames(word)
    if (type === 'vendors') return this.autocompleteService.searchVendorsNames(word)
    if (type === 'measures') return this.autocompleteService.MeasuresNamesInAttr(word)
  }

  // @Get('/products/names/:word')
  // getProductNames(@Param() params){
  //   const result = this.autocompleteService.searchProductsNames(params.word)
  //   return result
  // }
  //
  // @ApiOperation({summary: 'Получить массив названий производителей по ключевому слову'})
  // @ApiResponse({status: HttpStatus.OK, type: Array})
  // @Get('/vendors/names/:word')
  // getVendorNames(@Param() params){
  //   const result = this.autocompleteService.searchVendorsNames(params.word)
  //   return result
  // }
  //
  // @Get('/attrs/:word')
  // getAttrsNames(@Param() params){
  //   const result = this.autocompleteService.searchAttrsNames(params.word)
  //   return result
  // }
  //
  // @Get('/measures/:word')
  // getMeasuresNamesInAttr(@Param() params){
  //   const result = this.autocompleteService.MeasuresNamesInAttr(params.word)
  //   return result
  // }
}