import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class updateImageService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async updateImage(id: string,type:string, url: string) {
        console.log("url is ",url)
        const User = await this.userRepository.findOne({ where: { id } })
        console.log("USER IS",User)
        if (!User) {
            throw new HttpException('User not Found', 404);
        }
        if(type=='PROFILE'){
            User.image = url
        }

        if(type=='COVERIMAGE'){
            User.coverimage = url
        }

        await this.userRepository.save(User)

        return {message:'image updated successfully'}

    }
} 
