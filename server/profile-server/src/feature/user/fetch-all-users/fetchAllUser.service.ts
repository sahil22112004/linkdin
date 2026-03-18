import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Follow } from '../../../domain/entities/follow.entity';
import { Connection, ConnectionStatus } from '../../../domain/entities/connection.entity';
import { Not, Repository, IsNull } from 'typeorm';

@Injectable()
export class fetchAllProfileService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Follow)
        private followRepository: Repository<Follow>,

        @InjectRepository(Connection)
        private connectionRepository: Repository<Connection>
    ) {}

    async fetchAllProfile(user: any) {

        const profiles = await this.userRepository.find({
            where: { id: Not(user.uid) }
        });

        const allProfiles = await Promise.all(
            profiles.map(async (profile) => {

                const followerCount = await this.followRepository.count({
                    where: {
                        followToUser: { id: profile.id },
                        deletedAt: IsNull()
                    }
                });

                const isFollowing = await this.followRepository.exist({
                    where: {
                        followByUser: { id: user.uid },
                        followToUser: { id: profile.id },
                        deletedAt: IsNull()
                    }
                });

                const connection = await this.connectionRepository.findOne({
                    where: [
                        {
                            senderId: { id: user.uid },
                            receiverId: { id: profile.id }
                        },
                        {
                            senderId: { id: profile.id },
                            receiverId: { id: user.uid }
                        }
                    ],
                    withDeleted: true,
                    relations: ['senderId', 'receiverId']
                });

                let connectionStatus = 'NOT_EXISTED';

                if (connection) {
                    if (connection.deletedAt) {
                        connectionStatus = 'NOT_EXISTED';
                    } else if (connection.status === ConnectionStatus.ACCEPTED) {
                        connectionStatus = 'ACCEPTED';
                    } else if (connection.status === ConnectionStatus.PENDING) {
                        if (connection.senderId.id === user.uid) {
                            connectionStatus = 'PENDING';
                        } else {
                            connectionStatus = 'REQUESTED';
                        }
                    } else if (connection.status === ConnectionStatus.REJECTED) {
                        connectionStatus = 'REJECTED';
                    }
                }

                return {
                    ...profile,
                    followerCount,
                    isFollowing,
                    connectionStatus
                };
            })
        );

        return {
            message: "profiles fetch successfully",
            allProfiles
        };
    }
}