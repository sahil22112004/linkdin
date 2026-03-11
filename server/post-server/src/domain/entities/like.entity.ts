import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('likes')
export class Like {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    post_Id: string;

    @Column({ unique: true })
    user_Id: string;

    @DeleteDateColumn()
    deletedAt: Date | null

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

}