import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { fetchAllProfileService } from './fetchAllUser.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';

@Controller('fetchAllProfile')
export class fetchALLProfileController {
  constructor(private readonly fetchAllProfileService: fetchAllProfileService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  fetchAllProfile(@Req() req: any){
    return this.fetchAllProfileService.fetchAllProfile(req.user)
  }
}
