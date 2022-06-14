import { Injectable } from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt'
import {Response} from 'express'
import { CreateUserResponse } from '../users/dto/create-user-dto';

export interface TokenPayload{
  userId: string;
}

@Injectable()
export class AuthService{
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ){}


  async login(user: CreateUserResponse, response: Response): Promise<void>{
    const tokenPayload: TokenPayload = {
      userId: user._id
    }
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get("JWT_EXPIRATION_TIME")
    )
    const token = this.jwtService.sign(tokenPayload);
    console.log("token- ---> ", token)
    response.cookie('Authentication', token, {
      httpOnly: true, 
      expires
    });
  }
}