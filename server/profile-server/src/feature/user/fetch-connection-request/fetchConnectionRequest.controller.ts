import { Controller, Post, Patch, Get, Param, Req, UseGuards } from '@nestjs/common';
import { FetchConnectionRequestService } from './fetchConnectionRequest.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';

@Controller('connection')
export class FetchConnectionReqController {
  constructor(private readonly connectionService: FetchConnectionRequestService) {}

  @Get('requests')
  @UseGuards(FirebaseAuthGuard)
  async fetchRequests(@Req() req: any) {
    return await this.connectionService.fetchPendingRequests(req.user.uid);
  }
}