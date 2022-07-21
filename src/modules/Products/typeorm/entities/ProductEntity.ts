import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IProduct } from "@modules/Products/model/IProduct";

@Entity('products')
export class ProductEntity implements IProduct{

    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    quantity: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    description: string;

    @Column('decimal')
    price: number;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

}