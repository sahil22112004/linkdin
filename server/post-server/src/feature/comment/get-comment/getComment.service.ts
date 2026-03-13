import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Comment } from '../../../domain/entities/comment.enitity'

@Injectable()
export class FetchCommentService {

    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
    ) { }

    async fetchComments(post_Id: string, parentId: string | null, limit: number, offset: number) {

        if (parentId) {

            const comments = await this.commentRepository
                .createQueryBuilder('comment')
                .where('comment.comment_Id = :parentId', { parentId })
                .loadRelationCountAndMap('comment.replyCount', 'comment.replies')
                .take(limit)
                .skip(offset)
                .orderBy('comment.createdAt', 'DESC')
                .getMany()

            const replies = comments.map((comment: any) => {
                const isReplied = comment.replyCount > 0
                return {
                    ...comment,
                    haveReply: isReplied
                }
            })

            return replies
        }

        const comments = await this.commentRepository
            .createQueryBuilder('comment')
            .where('comment.post_Id = :post_Id', { post_Id })
            .andWhere('comment.comment_Id IS NULL')
            .loadRelationCountAndMap('comment.replyCount', 'comment.replies')
            .take(limit)
            .skip(offset)
            .orderBy('comment.createdAt', 'DESC')
            .getMany()

        const allComments = comments.map((comment: any) => {
            const isReplied = comment.replyCount > 0
            return {
                ...comment,
                haveReply: isReplied
            }
        })

        return allComments
    }

}