import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    chat_room_Id: string;

    @Column()
    sender_Id: string;

    @Column()
    reciver_Id: string;

    @Column()
    message: string;

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    receivedAt: Date;

}