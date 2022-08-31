import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IProduct } from "@modules/Products/model/IProduct";
import OrdersProductsEntity from "@modules/Orders/typeorm/entities/OrdersProductsEntity";

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

    @OneToMany(()=>OrdersProductsEntity,orders_products=>orders_products.product)
    orderProducts:OrdersProductsEntity;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

}