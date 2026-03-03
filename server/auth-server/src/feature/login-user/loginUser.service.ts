import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from '../../domain/dto/loginUser.dto';
import { User } from '../../domain/entities/user.entity';
import { adminAuth } from '../../infra/firebase/firebaseAdmin';
import { Repository } from 'typeorm';

@Injectable()
export class loginUserService {
  constructor(
         @InjectRepository(User) private userRepository: Repository<User>,
     ) { }
     async loginUser(dto: LoginAuthDto) {
         const { email, token } = dto
         console.log("email is ",email)
         const decodedToken = await adminAuth.verifyIdToken(token);
         if(decodedToken.email !== email){
             throw new HttpException('token do not match the given email', 404);
         }
         const existing = await this.userRepository.findOne({ where: { email:email } })
         console.log("",existing)

         if (!existing) {
             throw new HttpException('invalid credential', 404);
         }
         return { message: 'login successfully',user:existing };
     }
}
