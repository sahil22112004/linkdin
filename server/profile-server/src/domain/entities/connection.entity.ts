import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity';

export enum ConnectionStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED'
}


@Entity('connections')
export class Connection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, (user) => user.sentConnections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'senderId' })
    senderId: User;

    @ManyToOne(() => User, (user) => user.receivedConnections, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'receiverId' })
    receiverId: User;

    @Column({
        type: 'enum',
        enum: ConnectionStatus,
        default: ConnectionStatus.PENDING,
    })
    status: ConnectionStatus;

    @DeleteDateColumn()
    deletedAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;

}
