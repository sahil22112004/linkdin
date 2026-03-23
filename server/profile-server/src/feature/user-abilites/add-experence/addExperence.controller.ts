import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';
import { EducationDto } from 'src/domain/dto/addEducation.dto';
import { EducationService } from './addEductaion.service';

@Controller('profile')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post('education')
  @UseGuards(FirebaseAuthGuard)
  addEducation(@Body() dto: EducationDto, @Req() req: any) {
    return this.educationService.addEducation(dto, req.user.uid);
  }
}