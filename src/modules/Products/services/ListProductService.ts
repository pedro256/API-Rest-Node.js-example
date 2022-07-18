import { getCustomRepository } from "typeorm";
import { ProductEntity } from "../typeorm/entities/ProductEntity";
import { ProductRepository } from "../typeorm/repository/ProductRepository";

export default class ListProductService{
    public async execute():Promise<ProductEntity[]>{
        const productsRepository = getCustomRepository(ProductRepository);
        const products = productsRepository.find();
        return products;

    }
}