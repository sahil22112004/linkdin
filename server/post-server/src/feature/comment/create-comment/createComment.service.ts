import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../../../domain/entities/comment.enitity';
import { CreateCommentDto } from 'src/domain/dto/createComment.dto';

@Injectable()
export class CreateCommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ){}

    async CreateComment(post_Id: string, dto: CreateCommentDto, user: any){

        const {comment,comment_id} = dto

        const user_Id = user.uid

        const commentObject = {
            user_Id,
            post_Id: { id: post_Id },
            comment_Id: comment_id ? { id: comment_id } : null,
            comment
        }

        const Comment = this.commentRepository.create(commentObject)

        return await this.commentRepository.save(Comment)
    }
}