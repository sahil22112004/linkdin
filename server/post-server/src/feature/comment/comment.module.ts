import { Module } from '@nestjs/common';
import { CreateCommentService } from './create-comment/createComment.service';
import { CreateCommentController } from './create-comment/creaetComment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Comment} from '../../domain/entities/comment.enitity'
import {Post} from '../../domain/entities/post.entity'
import { FetchCommentController } from './get-comment/getComment.controler';
import { FetchCommentService } from './get-comment/getComment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment,Post])],
  controllers: [CreateCommentController,FetchCommentController],
  providers: [CreateCommentService,FetchCommentService],
})
export class CommentModule {}
