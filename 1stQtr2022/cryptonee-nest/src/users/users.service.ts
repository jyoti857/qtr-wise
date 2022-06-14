import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserRequest, CreateUserResponse } from './dto/create-user-dto';
import { User } from './model/User';
import { UsersRepository } from './users.repository';
import {hash, compare} from 'bcrypt'

@Injectable()
export class UsersService {

  constructor(private readonly usersRepository: UsersRepository){}

  async createUser(createUserRequest: CreateUserRequest){
    // go through the user validation
    await this.validateCreateUserRequest(createUserRequest);
    console.log("**@*#*@#*@(#2", createUserRequest)
    const user = await this.usersRepository.insertOne({
      ...createUserRequest,
      password: await hash(createUserRequest.password, 10)
    })
    
    // build response 
    return this.buildResponse(user)
  }


  async updateUser(userId: string, data: Partial<User>){
    const user = await this.usersRepository.updateOne(userId, data)
    if(!user){
      throw new NotFoundException(`User not found by _id: ${userId}`)
    }
    return this.buildResponse(user);
  }

  async validateCreateUserRequest(createUserRequest: CreateUserRequest):Promise<void>{
      const user = await this.usersRepository.findOneByEmail(createUserRequest.email);
      if(user){
        throw new BadRequestException("This email already exists!")
      }
    }
  async validateUser(email: string, password: string){
    const user = await this.usersRepository.findOneByEmail(email);
    if(!user){
      throw new NotFoundException(`User does not exist by email: ${email}`)
    }
    const passwordIsValid = await compare(password, user.password);
    if(!passwordIsValid){
      throw new UnauthorizedException('Credentials are invalid');
    }
    return this.buildResponse(user);
  }

  async getUserById(userId: string): Promise<CreateUserResponse>{
    const user = await this.usersRepository.findOneById(userId);
    if(!user){
      throw new NotFoundException(`User not found by _id: ${userId}`);
    }
    return this.buildResponse(user);
  }
  
  private buildResponse(user: User): CreateUserResponse{
    return {
      _id: user._id.toHexString(),
      email: user.email,
      // isCoinBasedAutho
    }
  }
}
