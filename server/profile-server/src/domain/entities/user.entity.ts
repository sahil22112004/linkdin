import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Follow } from './follow.entity';
import {Connection} from './connection.entity'

@Entity('users')
export class User {

    @PrimaryColumn({ unique: true })
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    fullname: string;

    @Column()
    image: string;

    @Column()
    coverimage: string;

    @Column()
    description: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @OneToMany(() => Follow, (follow) => follow.followByUser)
    following: Follow[];

    @OneToMany(() => Follow, (follow) => follow.followToUser)
    followers: Follow[];

    @OneToMany(() => Connection, (connection) => connection.senderId)
    sentConnections: Connection[];

    @OneToMany(() => Connection, (connection) => connection.receiverId)
    receivedConnections: Connection[];
}