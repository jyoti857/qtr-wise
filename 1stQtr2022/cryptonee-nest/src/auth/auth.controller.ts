import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserResponse } from '../users/dto/create-user-dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guards';

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService){}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: CreateUserResponse,
    @Res({passthrough: true}) response: Response
  ): Promise<void>{
    await this.authService.login(user, response);
    response.send(user)
  }
}
