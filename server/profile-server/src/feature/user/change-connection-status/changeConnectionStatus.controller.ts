import { Controller, Post, Patch, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ChnageConnectionStatusService } from './changeConnectionStatus.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';

@Controller('connection')
export class ChangeConnectionStatusController {
  constructor(private readonly connectionService: ChnageConnectionStatusService) {}

  @Patch(':id/:status')
  @UseGuards(FirebaseAuthGuard)
  async changeStatus(
    @Param('id') id: string,
    @Param('status') status: 'ACCEPTED' | 'REJECTED',
    @Req() req: any,
  ) {
    return await this.connectionService.changeStatus(
      id,
      status,
      req.user.uid,
    );
  }

}