import { Body, Controller, Param, Patch } from '@nestjs/common';
import { UpdateUserProfileService } from './update-user-profile.service';
import { updateUserDto } from 'src/domain/dto/update-userProfile.dto';

@Controller('updateProfile')
export class UpdateUserProfileController {
  constructor(private readonly updateUserProfileService: UpdateUserProfileService) {}

  @Patch('/:id')
  updateProfile(@Param('id') id: string,@Body() dto: updateUserDto){
    return this.updateUserProfileService.updateProfile(id,dto)
  }
}
