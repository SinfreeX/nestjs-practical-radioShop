import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

//dto описывающия необходимые данные для регистрации пользователя. /*
//dto - шаблон проектирования используемый для передачи данных между подсистемами приложения.*/
export class CreateUserDto {

  @ApiProperty({example: 'example@gmail.com', description: 'Почтовый ящик в формате string'})
  @IsString({message: 'Должно быть строкой'})
  @IsEmail({},{message: "Некорректный email"})
  readonly email: string


  @ApiProperty({example: 'qwerty', description: 'Пароль'})
  @IsString({message: 'Должно быть строкой'})
  @Length(4,16,{message:'Длина от 4 до 16 символов'})
  readonly password: string
}