import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity('likes')
export class Like {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_Id: string;

    @ManyToOne(() => Post, (post) => post.likes)
    @JoinColumn({ name: 'post_Id' })
    post_Id: Post;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

}