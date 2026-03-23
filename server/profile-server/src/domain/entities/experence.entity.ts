import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('experence') 
export class Experence {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.experence, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userid' })
    userid: User;

    @Column()
    title: string

    @Column()
    employmentType: string

    @Column()
    company: string

    @Column()
    location: string

    @Column()
    startTime: string

    @Column()
    endTime: string

    @DeleteDateColumn()
    deletedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;
}
