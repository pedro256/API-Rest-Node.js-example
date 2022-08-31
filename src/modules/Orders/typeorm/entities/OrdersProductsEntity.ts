import { ProductEntity } from "@modules/Products/typeorm/entities/ProductEntity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrderEntity from "./OrderEntity";

@Entity('orders-products')
export default class OrdersProductsEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column('int')
    quantity: number;

    @Column('decimal')
    price: number;

    @ManyToOne(()=>OrderEntity,order=>order.ordersProducts)
    @JoinColumn({name:'order_id'})
    order:OrderEntity;

    @ManyToOne(()=>ProductEntity,product=>product.orderProducts)
    @JoinColumn({name:'product_id'})
    product:ProductEntity;

    @Column()
    order_id:number;
    
    @Column()
    product_id:number;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}