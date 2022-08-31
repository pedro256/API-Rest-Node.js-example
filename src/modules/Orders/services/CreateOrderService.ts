import CustumersRepository from "@modules/Custumers/typeorm/repositories/CustumersRepository";
import { ProductRepository } from "@modules/Products/typeorm/repositories/ProductRepository";
import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import OrderEntity from "../typeorm/entities/OrderEntity";
import { OrderRepository } from "../typeorm/repositories/OrderRepository";

interface IProduct{
    id:number,
    quantity:number
}
interface IRequest{
    custumer_id:number;
    products:IProduct[];
}

export default class CreateOrderService{
    public async execute({custumer_id,products}:IRequest):Promise<OrderEntity>{
        const ordersRepository = getCustomRepository(OrderRepository);
        const productRepository = getCustomRepository(ProductRepository);
        const custumerRepository =getCustomRepository(CustumersRepository);
        
        const custumer = await custumerRepository.findById(custumer_id);
        if(!custumer){
            throw new AppError('Custumer not find .');
        }
        const productIds = products.map(p=>p.id);
        const existsProducts = await productRepository.findAllByIds(productIds);

         console.log(existsProducts)

        if(!existsProducts.length){
            throw new AppError('Could not find any products the gives ids.');
        }
        const existsProductsIDs = existsProducts.map(p=>p.id);
        const notFindProducts = products.filter(
            p=> !existsProductsIDs.includes(p.id)
        )
        if(notFindProducts.length){
            throw new AppError(`Could not find product with Id ${notFindProducts[0].id} .`)
        }

        const quantityAvaliable = products.filter(
            product=> {
                existsProducts.filter(p=>p.id === product.id)[0].quantity < product.quantity
            }
        )

        if(quantityAvaliable.length){
            throw new AppError(
                `Product (${quantityAvaliable[0].id}) quantity not avaliable ${quantityAvaliable[0].quantity} .`)
        }

        const productsSerialized = products.map(
            product=>({
                product_id:product.id,
                quantity:product.quantity,
                price:existsProducts.filter(p=>p.id===product.id)[0].price
            })
        )

        const order = await ordersRepository.createOrder({
            custumer,
            products:productsSerialized
        })

        const {ordersProducts} = order;

        console.log(existsProducts);
        console.log(ordersProducts)
        const updatedProductsQtd = ordersProducts.map(orderProduct=>({
            id:orderProduct.product_id,
            quantity: existsProducts.filter(p=>p.id===orderProduct.product_id)[0].quantity - orderProduct.quantity
        }))
        
        await productRepository.save(updatedProductsQtd);

        return order;
        
    }
}