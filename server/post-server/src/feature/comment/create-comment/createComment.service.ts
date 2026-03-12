import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../../domain/entities/comment.enitity';

@Injectable()
export class CreateCommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ){}

    async CreateComment(post_Id: string, Comment_id: string, user: any){

        const user_Id = user.uid

        const commentObject = {
            user_Id,
            post_Id: { id: post_Id },
            comment_Id: Comment_id ? { id: Comment_id } : null
        }

        const comment = this.commentRepository.create(commentObject)

        return await this.commentRepository.save(comment)
    }
}