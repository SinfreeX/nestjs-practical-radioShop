import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { ValidationException } from "../exceptions/validation.exception";



//Пайп реализующий валидацию входных данных.
//
//Реализован на основе интерфейса описывающего реализацию пайпов
@Injectable()
export class ValidationPipe implements PipeTransform<any>{
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    //plainToClass
    const obj = plainToInstance(metadata.metatype, value)
    const errors = await validate(obj)


    if (errors.length){
      let messages = errors.map(err => {
        return `${err.property} - ${Object.values(err.constraints).join(', ')}`
      })
      throw new ValidationException(messages)
    }
    return value
  }
}