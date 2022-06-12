import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "./users.model";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { ValidationPipe } from "../pipes/validation.pipe";

@ApiTags('Контроллер юзеров')
@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 201, type: User})
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto){
    return this.usersService.createUser(userDto)
  }


  @ApiOperation({summary: 'Получение списка пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Roles("Admin")
  @UseGuards(RolesGuard) //гуард от неавторизованных
  @Get()
  getAll(){
    return this.usersService.getAllUsers()
  }

  @ApiOperation({summary: 'Выдача ролей'})
  @ApiResponse({status: 200})
  @Roles("Admin")
  @UseGuards(RolesGuard) //гуард от неавторизованных
  @Post('/role')
  addRole(@Body() dto: AddRoleDto){
    return this.usersService.addRole(dto)
  }

  @ApiOperation({summary: 'Забанить пользователя'})
  @ApiResponse({status: 200})
  @Roles("Admin")
  @UseGuards(RolesGuard) //гуард от неавторизованных
  @Post('/ban')
  ban(@Body() dto: BanUserDto){
    return this.usersService.ban(dto)
  }

}
