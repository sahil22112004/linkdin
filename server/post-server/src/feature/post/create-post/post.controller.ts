import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from '../../../domain/dto/createPost.dto';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  craetePost(@Body() dto: CreatePostDto, @Req() req: any) {
    return this.postService.craetePost(dto,req.user);
  }
}
