import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

}