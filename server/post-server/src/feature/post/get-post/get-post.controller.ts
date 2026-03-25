import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { GetPostService } from './get-post.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';

@Controller('get-post')
export class GetPostController {
  constructor(private readonly getPostService: GetPostService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  getPost(
    @Req() req: any,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('sortBy') sortBy: 'recent' | 'likes' = 'recent',
  ) {
    return this.getPostService.getAllPost(req.user, page, limit, sortBy);
  }
}