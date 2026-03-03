import { Module } from '@nestjs/common';
import { GoogleLoginService } from './google-login.service';
import { GoogleLoginController } from './google-login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GoogleLoginController],
  providers: [GoogleLoginService],
})
export class GoogleLoginModule {}
