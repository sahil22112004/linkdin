import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { fetchUserProfileService } from './fetchUserProfile.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';

@Controller('fetchUserProfile')
export class fetchUserProfileController {
  constructor(private readonly fetchUserProfileService: fetchUserProfileService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  updateProfile(@Req() req: any){
    return this.fetchUserProfileService.fetchUserProfile(req.user)
  }
}
