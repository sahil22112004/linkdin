
import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from 'src/domain/dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';


@Injectable()
export class registerUserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    async registerUser(dto: CreateAuthDto) {
        const {email,firebase_id,fullname} = dto
        const existing =  await this.userRepository.findOne({where:{firebase_id:firebase_id}})
        console.log(existing)
        if (existing){
            throw new HttpException('user already existed', 404);
        }

        const User = this.userRepository.create({
            firebase_id,
            fullname,
            email
        })
        const userInfo = await this.userRepository.save(User)
        return {message:'user register successfully',userInfo};
    }
}
