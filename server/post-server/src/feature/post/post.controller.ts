import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../../domain/dto/createPost.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  craetePost(@Body() dto: CreatePostDto) {
    return this.postService.craetePost(dto);
  }
}
