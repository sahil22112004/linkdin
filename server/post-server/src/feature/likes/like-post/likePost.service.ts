import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../../../domain/entities/like.entity';
import { Post } from '../../../domain/entities/post.entity';

@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Like) private likeRepository: Repository<Like>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) {}

    async toggleLike(id: string, user: any) {

        const user_Id = user.uid

        const isPostExisted = await this.postRepository.findOne({ where: { id } })

        if (!isPostExisted) {
            throw new HttpException("post not found", 404)
        }

        const existingLike = await this.likeRepository.findOne({
            where: {
                post_Id: { id },
                user_Id
            },
            withDeleted: true
        });

        if (!existingLike) {

            const like = this.likeRepository.create({
                post_Id: isPostExisted,
                user_Id
            });

            return await this.likeRepository.save(like);
        }

        if (existingLike.deletedAt) {
            await this.likeRepository.restore(existingLike.id);
            return { message: 'Like restored' };
        }

        await this.likeRepository.softDelete(existingLike.id);
        return { message: 'Like removed' };
    }
}