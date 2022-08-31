

import CustumerEntity from "@modules/Custumers/typeorm/entities/CustumerEntity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProductsEntity from "./OrdersProductsEntity";


@Entity('orders')
export default class OrderEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>CustumerEntity)
    @JoinColumn({name:'custumer_id'})
    custumer:CustumerEntity;


    @OneToMany(
        ()=>OrdersProductsEntity,
        order_products => order_products.order,{
            cascade:true
        })
    ordersProducts:OrdersProductsEntity[];


    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;
}