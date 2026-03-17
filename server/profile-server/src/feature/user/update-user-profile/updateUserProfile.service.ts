import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { updateUserDto } from 'src/domain/dto/updateUser.dto';

@Injectable()
export class UpdateUserProfileService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    async updateProfile(id: string, dto: updateUserDto) {
        const { fullname, description, state, country } = dto
        const User = await this.userRepository.findOne({ where: { id } })
        console.log("USER IS",User)
        if (!User) {
            throw new HttpException('User not Found', 404);
        }
        User.fullname = fullname;
        User.description = description
        User.country = country
        User.state = state
        await this.userRepository.save(User)
        return { message: 'user update successfully', user: User }
    }
} 
