import { getCustomRepository } from "typeorm";
import { ProductEntity } from "../typeorm/entities/ProductEntity";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

export default class ShowProductService{
    public async execute(id:number):Promise<ProductEntity | undefined>{
        const productsRepository = getCustomRepository(ProductRepository);
        const products = productsRepository.findOne(id);
        if(!products){
            throw new AppError('Product not Found.',404)
        }
        return products;

    }
}