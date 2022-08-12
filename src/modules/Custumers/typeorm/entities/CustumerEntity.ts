

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity('custumers')
export default class CustumerEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('varchar')
    firstName:string;

    @Column('varchar')
    secondName:string;

    @Column('varchar')
    email:string;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}