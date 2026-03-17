import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post.entity';


@Entity('reposts')
export class rePost {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Post, (post) => post.rePosts)
    @JoinColumn({ name: 'post_Id' })
    post_Id: Post;

    @Column()
    user_Id: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    rePostedAt: Date;

}