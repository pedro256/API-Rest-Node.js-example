import {EntityRepository, In, Repository} from "typeorm";
import {ProductEntity} from "../entities/ProductEntity";

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
    public async findByName(name:string):Promise<ProductEntity|undefined>{
        const product = this.findOne({
            where:{
                name
            }
        });
        return product;
    }
    public async findAllByIds(ids:number[]):Promise<ProductEntity[]>{
        const existsProducts = await this.find({
            where:{
                id: In(ids)
            }
        });

        return existsProducts;

    }

}