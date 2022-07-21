import { getCustomRepository } from "typeorm";
import { ProductEntity } from "../typeorm/entities/ProductEntity";
import { ProductRepository } from "../typeorm/repositories/ProductRepository";

interface IRequest{
    id:number
    name:string;
    description:string;
    price:number;
    quantity:number;
}

export default class UpdateProductService{
    public async execute({id,name,price,quantity,description}:IRequest):Promise<ProductEntity>{
        const productsRepository = getCustomRepository(ProductRepository);
        const product = await productsRepository.findOne(id);
        if(!product){
            throw new AppError('Product not found.',404);
        }

        const productWithName = await productsRepository.findByName(name);
        if(productWithName && product.name != name){
            throw new AppError('Product Name Exists');
        }
        
        if(product.name!=name){
            product.name = name;
        }
        if(product.description!=description){
            product.description=description;
        }
        if(product.price!=price){
            product.price = price;
        }
        if(product.quantity!=quantity){
            product.quantity=quantity;
        }


        await productsRepository.save(product);

        return product;
    }
}