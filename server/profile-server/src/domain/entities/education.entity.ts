import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('education') 
export class Education {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.education, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userid' })
    userid: User;

    @Column()
    school: string

    @Column()
    degree: string

    @Column()
    fieldOfStudy: string

    @Column()
    startTime: string

    @Column()
    endTime: string

    @Column()
    grade: string

    @DeleteDateColumn()
    deletedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;
}
