import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

@Entity('user_inbox')
export class UserInbox {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    eventId: string

    @Column()
    handler: string

    @CreateDateColumn()
    receivedAt: Date

}