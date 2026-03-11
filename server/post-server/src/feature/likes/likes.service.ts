import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from '../../domain/dto/createLIke.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from '../../domain/entities/like.entity';

@Injectable()
export class LikesService {

    constructor(
        @InjectRepository(Like) private likeRepository: Repository<Like>,
    ) { }

    async toggleLike(dto: CreateLikeDto) {

     const {post_Id,user_Id} = dto 
    const existingLike = await this.likeRepository.findOne({
        where: { post_Id, user_Id },
        withDeleted: true
    });

    if (!existingLike) {
        const like = this.likeRepository.create({
            post_Id,
            user_Id
        });

        return await this.likeRepository.save(like);
    }

    if (existingLike.deletedAt) {
        await this.likeRepository.restore(existingLike.id);
        return { message: 'Like restored' };
    }

    await this.likeRepository.softDelete(existingLike.id);
    return { message: 'Like removed' };
}
}

