import { Controller, Post, Patch, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ConnectUserService } from './connectUser.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';

@Controller('connection')
export class ConnectUserController {
  constructor(private readonly connectionService: ConnectUserService) {}

  @Post(':receiverId')
  @UseGuards(FirebaseAuthGuard)
  async toggleConnection(@Param('receiverId') receiverId: string, @Req() req: any) {
    return await this.connectionService.toggleConnection(
      req.user.uid,
      receiverId,
    );
  }
}