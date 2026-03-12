import { Module } from '@nestjs/common';
import { UpdateUserProfileService } from './update-user-profile/update-user-profile.service';
import { UpdateUserProfileController } from './update-user-profile/update-user-profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UpdateUserProfileController],
  providers: [UpdateUserProfileService],
})
export class userModule {}
