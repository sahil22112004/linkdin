import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    firebase_id: string;

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

}