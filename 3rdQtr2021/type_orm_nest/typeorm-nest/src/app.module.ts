import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetController } from './pet.controller';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import {User} from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), 
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Pet])
],
  controllers: [AppController, PetController],
  providers: [AppService, PetService],
})
export class AppModule {}
