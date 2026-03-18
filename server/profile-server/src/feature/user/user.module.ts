import { Module } from '@nestjs/common';
import { UpdateUserProfileService } from './update-user-profile/updateUserProfile.service';
import { UpdateUserProfileController } from './update-user-profile/updateUserProfile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../domain/entities/user.entity';
import { fetchUserProfileController } from './fetch-user-profile/fetchUserProfile.controller';
import { fetchUserProfileService } from './fetch-user-profile/fetchUserProfile.service';
import { fetchAllProfileService } from './fetch-all-users/fetchAllUser.service';
import { fetchALLProfileController } from './fetch-all-users/fetchAlUser.controller';
import { Follow } from '../../domain/entities/follow.entity';
import { FolllowController } from './follow-user/followUser.controller';
import { FollowService } from './follow-user/followUser.service';
import { Connection } from '../../domain/entities/connection.entity';
import { ChangeConnectionStatusController } from './change-connection-status/changeConnectionStatus.controller';
import { ConnectUserController } from './connection-user/connectUser.controller';
import { FetchConnectionReqController } from './fetch-connection-request/fetchConnectionRequest.controller';
import { ChnageConnectionStatusService } from './change-connection-status/changeConnectionStatus.service';
import { ConnectUserService } from './connection-user/connectUser.service';
import { FetchConnectionRequestService } from './fetch-connection-request/fetchConnectionRequest.service';

@Module({
  imports: [TypeOrmModule.forFeature([User,Follow,Connection])],
  controllers: [
    UpdateUserProfileController,
    fetchUserProfileController,
    fetchALLProfileController,
    FolllowController,
    ChangeConnectionStatusController,
    ConnectUserController,
    FetchConnectionReqController

  ],
  providers: [
    UpdateUserProfileService,
    fetchUserProfileService,
    fetchAllProfileService,
    FollowService,
    ChnageConnectionStatusService,
    ConnectUserService,
    FetchConnectionRequestService
  ],
})
export class userModule {}
