import {EntityRepository, Repository} from "typeorm";
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

}