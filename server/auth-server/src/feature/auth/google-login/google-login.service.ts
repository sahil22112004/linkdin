import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoogleAuthDto } from '../../../domain/dto/googleUser.dto';
import { User } from '../../../domain/entities/user.entity';
import { adminAuth } from '../../../infrastructure/firebase/firebaseAdmin';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleLoginService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    async registerUser(dto: GoogleAuthDto) {
        const { email, firebase_id, fullname, token } = dto
        const decodedToken = await adminAuth.verifyIdToken(token);
        if(decodedToken.email !== email){
            throw new HttpException('token do not match the given email', 404);
        }
        const existing = await this.userRepository.findOne({ where: { firebase_id: firebase_id } })
        console.log(existing)
        if (existing) {
            return {message:'login successfully',user:existing}
        }
        const User = this.userRepository.create({
            firebase_id,
            fullname,
            email
        })
        const userInfo = await this.userRepository.save(User)
        return { message: 'user register successfully', user:userInfo };
    }
}
