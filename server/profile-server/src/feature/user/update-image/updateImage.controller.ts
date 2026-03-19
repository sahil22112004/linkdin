import { Body, Controller, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { updateImageService } from './updateImage.service';
import { FirebaseAuthGuard } from '../../../infrastructure/firebase/firebase-authGuard';

@Controller('updateImage')
export class UpdateImageController {
  constructor(private readonly updateImageService: updateImageService) {}

  @Patch(':type')
  @UseGuards(FirebaseAuthGuard)
  updateProfile(@Req() req: any,@Param('type') type: string,@Body() url: string){
    let finalUrl = '';
    if (typeof url === 'object' && url !== null) {
            finalUrl = Object.keys(url)[0];
        } else if (typeof url === 'string') {
            finalUrl = url;
        }
    return this.updateImageService.updateImage(req.user.uid,type,finalUrl)
  }
}
