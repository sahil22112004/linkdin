import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('follows') 
export class Follow {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'followByUser' })
    followByUser: User;

    @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'followToUser' })
    followToUser: User;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @CreateDateColumn()
    followedAt: Date;
}
