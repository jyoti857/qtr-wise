import {IsEmail, IsString,IsNotEmpty} from 'class-validator'
export class CreateUserRequest{
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class CreateUserResponse{
  @IsString()
  _id: string;

  @IsEmail()
  email: string;
}