import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { GoogleAuthDto } from '../../../domain/dto/googleUser.dto';
import { User } from '../../../domain/entities/user.entity';
import { adminAuth } from '../../../infrastructure/firebase/firebaseAdmin';
import { UsersOutbox } from 'src/domain/entities/userOutBox.entity';

@Injectable()
export class GoogleLoginService {
    constructor(private dataSource: DataSource) {}

    async registerUser(dto: GoogleAuthDto) {
        return this.dataSource.transaction(async (manager) => {
            const userRepository = manager.getRepository(User);
            const outBoxRepository = manager.getRepository(UsersOutbox);

            const { email, firebase_id, token, fullname } = dto;

            const decodedToken = await adminAuth.verifyIdToken(token);

            if (!decodedToken.email || decodedToken.email !== email) {
                throw new HttpException(
                    'Token email does not match provided email',
                    HttpStatus.UNAUTHORIZED
                );
            }

            const existingUser = await userRepository.findOne({
                where: { firebase_id },
            });

            if (existingUser) {
                return {
                    message: 'login successfully',
                    user: existingUser,
                };
            }

            const newUser = userRepository.create({
                firebase_id,
                email,
            });

            const savedUser = await userRepository.save(newUser);

            const outbox = outBoxRepository.create({
                Payload: {
                    user_Id: firebase_id,
                    email: email,
                    fullName: fullname,
                },
            });

            await outBoxRepository.save(outbox);

            return {
                message: 'user register successfully',
                user: savedUser,
            };
        });
    }
}