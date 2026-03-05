import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { updateUserDto } from 'src/domain/dto/update-userProfile.dto';
import { User } from '../../domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateUserProfileService {
    constructor(
        @InjectRepository(User)
        private userRepository :Repository<User>


    ){}


    async updateProfile(id:string,dto:updateUserDto){
        const {fullname,description} = dto
        const User = await this.userRepository.findOne({where:{firebase_id:id}})
        if(!User){
            throw new HttpException('User not Found', 404);
        }
        User.fullname= fullname;
        User.description=description
        await this.userRepository.save(User)
        return {message:'user update successfully',user:User}
    }
} 
