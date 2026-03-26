
import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from 'src/domain/dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm';
import { User } from '../../../domain/entities/user.entity';
import { UsersOutbox } from '../../../domain/entities/userOutBox.entity';


@Injectable()
export class registerUserService {
    constructor(
        private dataSource: DataSource,

        // @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    async registerUser(dto: CreateAuthDto) {

        return this.dataSource.transaction(async (manager) => {
            const userRepository =  manager.getRepository(User);
            const outBoxRepository = manager.getRepository(UsersOutbox)

            const { email, firebase_id ,fullname  } = dto
            const existing = await userRepository.findOne({ where: { firebase_id: firebase_id } })
            if (existing) {
                throw new HttpException('user already existed', 404);
            }

            const user = userRepository.create({
                firebase_id,
                email
            })
            const userInfo = await userRepository.save(user)

            const outbox = outBoxRepository.create({
                Payload:{
                    user_Id:firebase_id,
                    email:email,
                    fullName:fullname
                }
            })

            await outBoxRepository.save(outbox)
            return { message: 'user register successfully', userInfo };
        })

    }
}
