import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../domain/entities/user.entity';
import { Repository } from 'typeorm';
import { Follow } from '../../../domain/entities/follow.entity';


@Injectable()
export class FollowService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Follow) private followRepository: Repository<Follow>,
    ) { }

    async togglefollow(id: string, user: any) {
        const followByUserId = user.uid

        const followByUser = await this.userRepository.findOne({ 
            where: { id: followByUserId },
            
         })
        if (!followByUser) {
            throw new HttpException("unauthorized ", 403)
        }
        const followToUser = await this.userRepository.findOne({ where: { id: id } })
        if (!followToUser) {
            throw new HttpException("user Not Found", 404)
        }

        const isFollowing = await this.followRepository.findOne({
            where: {
                followByUser,
                followToUser
            },
            withDeleted: true
        })

        if (!isFollowing) {
            const follow = this.followRepository.create({
                followByUser,
                followToUser
            })

            await this.followRepository.save(follow)
            return {message:"follow successfully"}
        }

        if(isFollowing.deletedAt){
            await this.followRepository.restore(isFollowing.id)
            return { message: 'follow restored' };
        }

        await this.followRepository.softDelete(isFollowing.id)
        return { message: 'follow removed' };
        


    }
}