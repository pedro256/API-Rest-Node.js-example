import CustumersRepository from "@modules/Custumers/typeorm/repositories/CustumersRepository";
import { ProductRepository } from "@modules/Products/typeorm/repositories/ProductRepository";
import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import OrderEntity from "../typeorm/entities/OrderEntity";
import { OrderRepository } from "../typeorm/repositories/OrderRepository";

interface IRequest{
    id:number;
}

export default class ShowOrderService{
    public async execute({id}:IRequest):Promise<OrderEntity>{
        const ordersRepository = getCustomRepository(OrderRepository);
        const order = await ordersRepository.findById(id);

        if(!order){
            throw new AppError('Order not found.');
        }
        

        return order;
    }
}