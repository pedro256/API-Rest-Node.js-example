import { getCustomRepository } from "typeorm";
import { ProductEntity } from "../typeorm/entities/ProductEntity";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequest{
    name:string;
    description:string;
    price:number;
    quantity:number;
}

export default class CreateProductService{
    public async execute({name,price,quantity,description}:IRequest):Promise<ProductEntity>{
        const productsRepository = getCustomRepository(ProductRepository);
        const productExists = await productsRepository.findByName(name);
        if(productExists){
            throw new AppError('Product Name Exists');
        }
        const product = productsRepository.create({
            name,
            description,
            price,
            quantity
        })

        await productsRepository.save(product);

        return product;
    }
}