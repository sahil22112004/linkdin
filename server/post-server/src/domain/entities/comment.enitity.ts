import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_Id: string;

    @ManyToOne(() => Post, (post) => post.comments)
    @JoinColumn({ name: 'post_Id' })
    post_Id: Post;

    @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
    @JoinColumn({ name: 'comment_Id' })
    comment_Id: Comment | null;

    @OneToMany(() => Comment, (comment) => comment.comment_Id)
    replies: Comment[];

    @Column()
    comment: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

}