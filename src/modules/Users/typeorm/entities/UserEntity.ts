import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Exclude} from 'class-transformer';

@Entity('users')
export default class UserEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    firstName:string;

    @Column('varchar')
    secondName:string;

    @Column('varchar')
    email:string;

    
    @Column('varchar')
    @Exclude()
    password:string;

    @Column('varchar')
    avatar?:string;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}