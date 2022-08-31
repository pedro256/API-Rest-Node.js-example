import CustumerEntity from "@modules/Custumers/typeorm/entities/CustumerEntity";
import {EntityRepository, Repository} from "typeorm";
import OrderEntity from "../entities/OrderEntity";

interface IProduct{
    product_id:number;
    price:number;
    quantity:number;
}
interface IRequest{
    custumer:CustumerEntity;
    products:IProduct[];
}

@EntityRepository(OrderEntity)
export class OrderRepository extends Repository<OrderEntity> {
    public async findById(id:number):Promise<OrderEntity|undefined>{
        const order = await this.findOne(id,{
            relations:['custumer','ordersProducts']
        });
        return order;
    }

    public async createOrder({custumer,products}:IRequest):Promise<OrderEntity>{
        const order = this.create({
            custumer,
            ordersProducts:products
        })
        await this.save(order);

        return order;
    }

}