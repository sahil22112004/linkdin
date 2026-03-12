import { Module } from '@nestjs/common';
import { PostService } from './create-post/post.service';
import { PostController } from './create-post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../domain/entities/post.entity';
import { GetPostController } from './get-post/get-post.controller';
import { GetPostService } from './get-post/get-post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController,GetPostController],
  providers: [PostService,GetPostService],
})
export class PostModule {}
