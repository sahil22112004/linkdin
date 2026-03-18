import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { FollowService } from './followUser.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';


@Controller('follow')
export class FolllowController {
  constructor(private readonly FollowService: FollowService) { }

  @Post(':id')
  @UseGuards(FirebaseAuthGuard)
  likePost(@Param('id') id: string, @Req() req: any) {
    return this.FollowService.togglefollow(id,req.user)
  }

}
