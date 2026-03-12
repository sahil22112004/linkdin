import { Injectable } from '@nestjs/common';
import { CreatePostDto } from '../../../domain/dto/createPost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../../domain/entities/post.entity';

@Injectable()
export class PostService {

    constructor(
         @InjectRepository(Post) private postRepository: Repository<Post>,
     ) { }


    async craetePost(dto: CreatePostDto,user: any){
        const {post,media_url} = dto
        console.log("user is ",user)
        const postData = {
            post,
            media_url,
            user_Id:user.uid
        }

        const Post =  this.postRepository.create(postData)
        await this.postRepository.save(Post)

        return {message:'posted successfully',post:Post}

    }
}
