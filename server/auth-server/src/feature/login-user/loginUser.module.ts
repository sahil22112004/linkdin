import { Module } from '@nestjs/common';
import { loginUserController } from './loginUser.controller';
import { loginUserService } from './loginUser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [loginUserController],
  providers: [loginUserService],
})
export class loginModule {}