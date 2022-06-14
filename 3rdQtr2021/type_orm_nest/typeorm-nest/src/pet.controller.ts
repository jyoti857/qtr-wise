import { Controller, Get, Post } from "@nestjs/common";
import { PetService } from "./pet.service";


@Controller('/pet')
export class PetController{
  constructor(private readonly petService: PetService){}

  @Get()
  async getAll(){
    return await this.petService.getAllPets();
  }

  @Post()
  async createPost(){
    return await this.petService.createPet("dog")
  }
}