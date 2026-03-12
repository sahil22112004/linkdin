import { Module } from '@nestjs/common';
import { LikesService } from './like-post/likePost.service';
import { LikesController } from './like-post/likePost.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from '../../domain/entities/like.entity';
import { Post } from '../../domain/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like,Post])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
