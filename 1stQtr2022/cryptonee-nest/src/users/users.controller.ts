import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { ValidationPipe } from '../pipes/validationPipes';
import { CreateUserRequest, CreateUserResponse } from './dto/create-user-dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService){}


  @Post()
  async createUser(
    @Body(new ValidationPipe()) CreateUserRequest: CreateUserRequest
  ): Promise<CreateUserResponse>{
    return this.usersService.createUser(CreateUserRequest)
  }

  @Get()
  @UseGuards(JwtStrategy)
  async getUser(@CurrentUser() user: CreateUserResponse){
    return user;
  }
}
