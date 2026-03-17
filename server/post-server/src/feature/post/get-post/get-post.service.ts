// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Post } from '../../../domain/entities/post.entity';
// import { Repository } from 'typeorm';
// import { rePost } from 'src/domain/entities/rePost.entity';

// @Injectable()
// export class GetPostService {

//     constructor(
//         @InjectRepository(Post) private postRepository: Repository<Post>,
//         @InjectRepository(rePost) private rePostRepository: Repository<rePost>,
//     ) { }

//     async getAllPost(user: any) {

//         const posts = await this.postRepository.find({
//             relations: ['likes']
//         })

//         const result = posts.map(post => {

//             const likeCount = post.likes.filter(like => !like.deletedAt).length

//             const isLiked = post.likes.some(
//                 like => like.user_Id === user.uid && !like.deletedAt
//             )

//             return {
//                 ...post,
//                 likeCount,
//                 isLiked
//             }
//         })

//         return {
//             message: 'post fetch successfully',
//             allPost: result
//         }
//     }
// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../../domain/entities/post.entity';
import { Repository } from 'typeorm';
import { rePost } from 'src/domain/entities/rePost.entity';

@Injectable()
export class GetPostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(rePost) private rePostRepository: Repository<rePost>,
    ) { }

    async getAllPost(user: any) {

        const posts = await this.postRepository.find({
            relations: ['likes']
        })

        const reposts = await this.rePostRepository.find({
            relations: ['post_Id', 'post_Id.likes']
        })

        const postFeed = posts.map(post => {

            const likeCount = post.likes.filter(like => !like.deletedAt).length

            const isLiked = post.likes.some(
                like => like.user_Id === user.uid && !like.deletedAt
            )

            return {
                feedId: `post-${post.id}`,
                ...post,
                likeCount,
                isLiked,
                repostedBy: null,
                repostedAt: null
            }
        })


        const repostFeed = reposts.map(repost => {

            const post = repost.post_Id

            const likeCount = post.likes.filter(like => !like.deletedAt).length

            const isLiked = post.likes.some(
                like => like.user_Id === user.uid && !like.deletedAt
            )

            return {
                feedId: `repost-${repost.id}`,
                ...post,
                likeCount,
                isLiked,
                repostedBy: repost.user_Id,
                repostedAt: repost.rePostedAt
            }
        })


        const finalFeed = [...postFeed, ...repostFeed].sort(
            (a, b) =>
                new Date(b.repostedAt || b.createdAt).getTime() -
                new Date(a.repostedAt || a.createdAt).getTime()
        )


        return {
            message: 'post fetch successfully',
            allPost: finalFeed
        }
    }
}