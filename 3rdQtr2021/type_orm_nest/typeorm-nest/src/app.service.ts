import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class AppService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  
  getAll(): Promise<User[]>{
    return this.userRepository.find({
      relations: ['pets']
    }); // select * from user join Pets
  }

  async getUserById(id: number): Promise<User>{
    try{
      return await this.userRepository.findOneOrFail(id);
    }catch(err){
      throw err;
    }
  }

  async createUser(name: string): Promise<User>{
    const newUser = await this.userRepository.create({name}) // const newUser = new User(); newUser.name = name;
    return this.userRepository.save(newUser); // INSERT
  }

  async updateUser(id: number, name: string ): Promise<User>{
    const findUser = await this.userRepository.findOne(id);
    if(findUser){
      findUser.name = name;
      return this.userRepository.save(findUser)
    }else{
      throw new Error("just throw error as the user of the provided id is not present in the db");
    }
  }

  async deleteUser(id): Promise<User>{
    const findUser = await this.userRepository.findOne(id);
    if(findUser){
      return await this.userRepository.remove(findUser);
    }else throw new Error("as the id provided is not valid or present")
  }

  getHello(): string {
    return 'Hello World!';
  }
}
