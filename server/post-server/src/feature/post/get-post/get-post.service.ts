import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetPostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) { }

    async getAllPost(user: any) {

        const posts = await this.postRepository.find({
            relations: ['likes']
        })

        const result = posts.map(post => {

            const likeCount = post.likes.filter(like => !like.deletedAt).length

            const isLiked = post.likes.some(
                like => like.user_Id === user.uid && !like.deletedAt
            )

            return {
                ...post,
                likeCount,
                isLiked
            }
        })

        return {
            message: 'post fetch successfully',
            allPost: result
        }
    }
}