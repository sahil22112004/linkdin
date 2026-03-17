import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

export enum OutboxStatus {
    PENDING = 'PENDING',
    PUBLISHED = 'PUBLISHED'
}

@Entity('users_outbox')
export class UsersOutbox {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'jsonb' })
    Payload: any

    @Column({
        type: 'enum',
        enum: OutboxStatus,
        default: OutboxStatus.PENDING
    })
    status: OutboxStatus

    @CreateDateColumn()
    createdAt: Date

}