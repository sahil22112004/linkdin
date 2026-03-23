import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ExperenceService } from './addExperence.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';
import { ExperenceDto } from 'src/domain/dto/addExperence.dto';


@Controller('profile')
export class FolllowController {
  constructor(private readonly ExperenceService: ExperenceService) { }

  @Post('experence')
  @UseGuards(FirebaseAuthGuard)
  likePost(@Body()  dto: ExperenceDto, @Req() req: any) {
    return this.ExperenceService.addExperience(dto,req.user.uid)
  }

}
