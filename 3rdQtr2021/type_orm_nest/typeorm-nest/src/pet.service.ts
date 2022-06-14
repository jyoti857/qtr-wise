import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pet } from "./pet.entity";



export class PetService{
  constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>){

  }

  getAllPets(): Promise<Pet[]>{
    return this.petRepository.find();
  }

  createPet(name): Promise<Pet>{
    const newPet = this.petRepository.create({name});
    return this.petRepository.save(newPet)
  }
}