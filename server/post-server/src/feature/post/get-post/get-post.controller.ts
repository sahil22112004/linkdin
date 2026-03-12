import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetPostService } from './get-post.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';


@Controller('get-post')
export class GetPostController {
  constructor(private readonly getPostService: GetPostService) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  getPost(@Req() req: any){
    return this.getPostService.getAllPost(req.user)
  }

}
