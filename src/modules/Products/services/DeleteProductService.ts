
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequest{
    id:number
}

export default class DeleteProductService{
    public async execute({id}:IRequest):Promise<void>{
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);
        if(!product){
            throw new AppError('Product not found.',404);
        }
        await productsRepository.remove(product);
    }
}