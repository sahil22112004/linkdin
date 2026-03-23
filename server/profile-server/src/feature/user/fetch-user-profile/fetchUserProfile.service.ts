import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { Follow } from '../../../domain/entities/follow.entity';
import { Connection, ConnectionStatus } from '../../../domain/entities/connection.entity';

@Injectable()
export class fetchUserProfileService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Follow)
        private followRepository: Repository<Follow>,

        @InjectRepository(Connection)
        private connectionRepository: Repository<Connection>
    ) {}

    async fetchUserProfile(user: any) {
        const id = user.uid;

        const UserInfo = await this.userRepository.findOne({
            where: { id },
            relations: [
                'experence',   
                'education'   
            ]
        });

        if (!UserInfo) {
            throw new HttpException("User Not Exist", 404);
        }

        const connectionCount = await this.connectionRepository.count({
            where: [
                {
                    senderId: { id: user.uid },
                    status: ConnectionStatus.ACCEPTED
                },
                {
                    receiverId: { id: user.uid },
                    status: ConnectionStatus.ACCEPTED
                }
            ],
            withDeleted: true
        });

        const User = {
            ...UserInfo,
            connectionCount,
            firebase_id: UserInfo.id
        };

        return {
            message: 'user fetch successfully',
            user: User
        };
    }
}