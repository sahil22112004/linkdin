import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { RePostService } from './rePost.service';
import { CreatePostDto } from '../../../domain/dto/createPost.dto';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';


@Controller('repost')
export class RePostController {
  constructor(private readonly rePostService: RePostService) { }

  @Post(':post_Id')
  @UseGuards(FirebaseAuthGuard)
  RePost(@Param('post_Id') post_Id: string, @Req() req: any) {
    return this.rePostService.RePost(post_Id,req.user);
  }
}
