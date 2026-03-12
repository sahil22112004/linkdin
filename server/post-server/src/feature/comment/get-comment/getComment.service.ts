import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, IsNull } from 'typeorm'
import { Comment } from '../../../domain/entities/comment.enitity'

@Injectable()
export class FetchCommentService {

    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
    ){}

    async fetchComments(post_Id: string, parentId: string | null, limit: number, offset: number){

        if(parentId){
            const replies = await this.commentRepository.find({
                where:{
                    comment_Id:{ id: parentId }
                },
                take: limit,
                skip: offset,
                order:{
                    createdAt:"DESC"
                }
            })

            return replies
        }

        const comments = await this.commentRepository.find({
            where:{
                post_Id:{ id: post_Id },
                comment_Id:IsNull()
            },
            take: limit,
            skip: offset,
            order:{
                createdAt:"DESC"
            }
        })

        return comments
    }

}