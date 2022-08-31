import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ShowOrderService from "../services/ShowOrderService";

export default class OrderController{

    public async show(request:Request,response:Response):Promise<Response>{
        const {id}=request.params;
        const idParam = Number.parseInt(id);
        const showOrderService = new ShowOrderService();
        const order = await showOrderService.execute({id:idParam});
        return response.json(order);
    }
    public async create(request:Request,response:Response):Promise<Response>{
        try {
            const {custumer_id,products}=request.body;
            const createOrder = new CreateOrderService();
            const order = await createOrder.execute({
                custumer_id,
                products
            })
            return response.json(order)
        } catch (error) {
            console.log(error)
            return response.json({
                "erro":1
            })
        }
        
    }

}