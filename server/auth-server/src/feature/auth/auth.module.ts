import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { loginUserController } from './login-user/loginUser.controller';
import { loginUserService } from './login-user/loginUser.service';
import { registerUserService } from './register-user/register.service';
import { registerUserController } from './register-user/register.controller';
import { GoogleLoginController } from './google-login/google-login.controller';
import { GoogleLoginService } from './google-login/google-login.service';
import { UsersOutbox } from '../../domain/entities/userOutBox.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,UsersOutbox])],
  controllers: [loginUserController,registerUserController,GoogleLoginController],
  providers: [loginUserService,registerUserService,GoogleLoginService],
})
export class authModule {}