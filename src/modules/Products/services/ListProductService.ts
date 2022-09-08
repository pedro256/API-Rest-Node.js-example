import { getCustomRepository } from "typeorm";
import { ProductEntity } from "../typeorm/entities/ProductEntity";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";
import RedisCache from "@shared/cache-service/RedisCache";

export default class ListProductService{
    public async execute():Promise<ProductEntity[]>{
        const productsRepository = getCustomRepository(ProductRepository);
        const redisCache = new RedisCache();
        let products = await redisCache.recover<ProductEntity[]>('PRODUCTS-LS');
        if(!products){
            products = await productsRepository.find();
            await redisCache.save('PRODUCTS-LS',products)
        }
        //await redisCache.save('teste','teste')
        return products;

    }
}