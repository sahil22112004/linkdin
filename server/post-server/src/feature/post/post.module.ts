import { Module } from '@nestjs/common';
import { PostService } from './create-post/post.service';
import { PostController } from './create-post/post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../domain/entities/post.entity';
import { GetPostController } from './get-post/get-post.controller';
import { GetPostService } from './get-post/get-post.service';
import { RePostController } from './re-post/rePost.controller';
import { RePostService } from './re-post/rePost.service';
import { rePost } from 'src/domain/entities/rePost.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post,rePost])],
  controllers: [PostController,GetPostController,RePostController],
  providers: [PostService,GetPostService,RePostService],
})
export class PostModule {}
