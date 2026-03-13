import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateCommentService } from './createComment.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';
import { CreateCommentDto } from 'src/domain/dto/createComment.dto';


@Controller('comment')
export class CreateCommentController {
  constructor(private readonly CreateCommentService: CreateCommentService) {}

  @Post(':id')
  @UseGuards(FirebaseAuthGuard)
  createComment(@Param('id') id: string,@Body() dto:CreateCommentDto,@Req() req: any){
    return this.CreateCommentService.CreateComment(id,dto,req.user)
  }
}
