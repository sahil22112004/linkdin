import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../../domain/entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetPostService {

    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ) { }

    async getAllPost() {
        const allPost = await this.postRepository.find()
        return { message: 'post fetch successfully', allPost: allPost }
    }
}
