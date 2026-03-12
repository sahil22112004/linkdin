import { Module } from '@nestjs/common';
import { CreateCommentService } from './create-comment/createComment.service';
import { CreateCommentController } from './create-comment/creaetComment.controller';

@Module({
  controllers: [CreateCommentController],
  providers: [CreateCommentService],
})
export class CommentModule {}
