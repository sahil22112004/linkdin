import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';

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

}