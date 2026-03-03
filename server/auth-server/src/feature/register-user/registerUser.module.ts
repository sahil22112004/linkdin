import { Module } from '@nestjs/common';
import { registerUserController } from './register.controller';
import { registerUserService } from './register.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [registerUserController],
  providers: [registerUserService],
})
export class registerUserModule {}