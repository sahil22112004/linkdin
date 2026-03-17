import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Like } from './like.entity';
import {Comment} from './comment.enitity'
import { rePost } from './rePost.entity';

@Entity('posts')
export class Post {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    post: string;

    @Column()
    media_url: string;

    @Column()
    user_Id: string;

    @OneToMany(() => Like, (like) => like.post_Id)
    likes: Like[];

    @OneToMany(() => rePost, (repost) => repost.post_Id)
    rePosts: rePost[];

    @OneToMany(() => Comment, (comment) => comment.post_Id)
    comments: Comment[];

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

}