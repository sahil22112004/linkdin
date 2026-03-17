import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserProfileService } from './updateUserProfile.service';
import { updateUserDto } from '../../../domain/dto/updateUser.dto';

@Controller('updateProfile')
export class UpdateUserProfileController {
  constructor(private readonly updateUserProfileService: UpdateUserProfileService) {}

  @Patch('/:id')
  updateProfile(@Param('id') id: string,@Body() dto: updateUserDto){
    return this.updateUserProfileService.updateProfile(id,dto)
  }
}
