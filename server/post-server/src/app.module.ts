import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './feature/post/post.module';
import { config } from "dotenv"
import { Post } from './domain/entities/post.entity';
import { GetPostModule } from './feature/get-post/get-post.module';

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
      entities: [Post],
      synchronize: false,
    }),
    PostModule,
    GetPostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
