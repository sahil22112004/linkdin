import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CreateCommentService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    ){}

    CreateComment(post_Id:string,Comment_id:string,user:any){

        let comment_Id :string|null = null
        const user_Id = user.uid
        if(Comment_id){
            comment_Id=Comment_id
        }

        const commentObject = {
            user_Id,
            post_Id,
            comment_Id
        }
        const Comment = this.commentRepository.create(commentObject)
        
    }
}
