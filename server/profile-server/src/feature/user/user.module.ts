import { Module } from '@nestjs/common';
import { UpdateUserProfileService } from './update-user-profile/updateUserProfile.service';
import { UpdateUserProfileController } from './update-user-profile/updateUserProfile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { fetchUserProfileController } from './fetch-user-profile/fetchUserProfile.controller';
import { fetchUserProfileService } from './fetch-user-profile/fetchUserProfile.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UpdateUserProfileController,fetchUserProfileController],
  providers: [UpdateUserProfileService,fetchUserProfileService],
})
export class userModule {}
