import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class fetchUserProfileService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async fetchUserProfile(user: any) {
        const id = user.uid
        const UserInfo = await this.userRepository.findOne({ where: { id } })
        if (!UserInfo){
            throw new HttpException("User Not Exist", 404)
        }
        const User = {
            ...UserInfo,
            firebase_id:UserInfo.id
        }

        return {message:'user fetch successfully',user:User}
    }
} 
