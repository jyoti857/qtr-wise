import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createUser(){
    return this.appService.createUser("Nicole")
  }
  @Get('/users')
  async getAllUser(){
    return this.appService.getAll();
  }
  @Get()
  async getUser(){
    return this.appService.getUserById(1)
  }

  @Delete()
  async deleteUser(){
    return this.appService.deleteUser(1)
  }

  @Put()
  async updateUser(){
    return this.appService.updateUser(2, "jyoti")
  }

  

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
