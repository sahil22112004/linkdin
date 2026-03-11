import { Body, Controller, Post } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from '../../domain/dto/createLIke.dto';

@Controller('post')
export class LikesController {
  constructor(private readonly likesService: LikesService) { }

  @Post('like')
  likePost(@Body() dto: CreateLikeDto) {
    return this.likesService.toggleLike(dto)
  }
}
