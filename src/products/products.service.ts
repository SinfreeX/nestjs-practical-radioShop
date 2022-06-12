import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ProductDto } from "./dto/product.dto";
import { ProductsModel } from "./products.model";

@Injectable()
export class ProductsService {

  constructor(@InjectModel(ProductsModel) private productsRepository: typeof ProductsModel) {}

  async create(dto: ProductDto){
    return await this.productsRepository.create(dto)
  }

  async getAll() {
    const products = await this.productsRepository.findAll<ProductsModel>({
      // include:[{
      //     model: AttributevalueModel,
      //     include: [MeasureModel, AttributeModel]
      //   }]
      include:[{all:true, nested:true}]
    })
    console.log(products)
    return products
  }

  async getOneById(id) {
    const products = await this.productsRepository.findByPk(id)
    if (products){
      return products
    }
    throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND)
  }

  async getByCategory(category) {

  }

  async edit(dto) {
    const products = await this.productsRepository.findByPk(dto.id)
    if (products){
      return await products.update(dto)
    }
    throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND)
  }

  async delete(id) {
    const idd = Number(id)
    if (idd){
      const products = await this.productsRepository.destroy({where:{id:idd}})
      if (products){
        return products
      }
    }
    throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND)
  }
}
