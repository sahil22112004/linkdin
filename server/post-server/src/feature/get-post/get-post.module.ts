import { Module } from '@nestjs/common';
import { GetPostService } from './get-post.service';
import { GetPostController } from './get-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../domain/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [GetPostController],
  providers: [GetPostService],
})
export class GetPostModule {}
