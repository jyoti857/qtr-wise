import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import {PassportStrategy} from '@nestjs/passport'
import { Request } from 'express'
import {Strategy, ExtractJwt} from 'passport-jwt'
import { CreateUserResponse } from '../../users/dto/create-user-dto'
import { UsersService } from '../../users/users.service'
import { TokenPayload } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private configService: ConfigService,
    private readonly usersService: UsersService
  ){
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate(payload: TokenPayload): Promise<CreateUserResponse>{
    return this.usersService.getUserById(payload.userId)
  }
}