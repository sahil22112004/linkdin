import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateCommentService } from './createComment.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';


@Controller('comment')
export class CreateCommentController {
  constructor(private readonly CreateCommentService: CreateCommentService) {}

  @Post(':id')
  @UseGuards(FirebaseAuthGuard)
  createComment(@Param('id') id: string,@Body() comment_id:string,@Req() req: any){
    return this.CreateCommentService
  }
}
