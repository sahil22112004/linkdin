import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './feature/post/post.module';
import { config } from "dotenv"
import { Post } from './domain/entities/post.entity';
import { LikesModule } from './feature/likes/likes.module';
import { Like } from './domain/entities/like.entity';
import {Comment} from './domain/entities/comment.enitity'
import { CommentModule } from './feature/comment/comment.module';
import { rePost } from './domain/entities/rePost.entity';

config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Post,Like,Comment,rePost],
      synchronize: false,
    }),
    PostModule,
    LikesModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
