import { Body, Controller, Get } from '@nestjs/common';
import { GetPostService } from './get-post.service';

@Controller('get-post')
export class GetPostController {
  constructor(private readonly getPostService: GetPostService) {}

  @Get()
  getPost(){
    return this.getPostService.getAllPost()
  }

}
