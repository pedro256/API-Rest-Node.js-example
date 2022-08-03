import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users_tokens")
export default class UserTokenEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @Generated('uuid')
    token:string;

    @Column({name:'user_id'})
    userId:number;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

}
