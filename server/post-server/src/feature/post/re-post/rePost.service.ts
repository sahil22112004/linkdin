import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../../domain/dto/createPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { rePost } from '../../../domain/entities/rePost.entity';

@Injectable()
export class RePostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(rePost) private rePostRepository: Repository<rePost>,
    ) { }


    async RePost(post_Id: string, user: any) {

        const user_Id = user.uid
        const isPostExisted = await this.postRepository.findOne({
            where: {
                id: post_Id
            }
        })

        if (!isPostExisted) {
            throw new HttpException("post not found", 404)
        }

        const rePostExisted = await this.rePostRepository.findOne({
            where: {
                user_Id,
                post_Id:{id:post_Id}
            }
        })
        console.log('repost is ',rePostExisted)

        if (rePostExisted) {
            throw new HttpException("Already Reposted", 409)
        }

        const RePost = this.rePostRepository.create({
            user_Id,
            post_Id:isPostExisted
        })

        await this.rePostRepository.save(RePost)
        return {message:'repost successfully'}


    }
}
