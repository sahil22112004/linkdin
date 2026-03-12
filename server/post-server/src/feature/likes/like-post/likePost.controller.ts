import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likePost.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';
import { CheckId } from '../../../domain/dto/checkId.dto';


@Controller('post')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Post('like/:id')
  @UseGuards(FirebaseAuthGuard)
  likePost(@Param('id') id: string, @Req() req: any) {
    return this.likesService.toggleLike(id.toString(),req.user)
  }

}
