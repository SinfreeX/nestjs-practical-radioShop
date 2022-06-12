import { HttpException, HttpStatus } from "@nestjs/common";

//Класс описывающий кастомные ошибки
export class ValidationException extends HttpException{
  message

  constructor(response) {
    super(response, HttpStatus.BAD_REQUEST)
    this.message = response
  }

}