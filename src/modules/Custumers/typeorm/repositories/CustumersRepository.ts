import { EntityRepository, Repository } from "typeorm";
import CustumerEntity from "../entities/CustumerEntity";


@EntityRepository(CustumerEntity)
export default class CustumersRepository extends Repository<CustumerEntity>{

    public async findByName(firstName:string,secondName:string):Promise<CustumerEntity[]>{
        const custumers = await this.find({
            where:{
                firstName,
                secondName
            }
        })
        return custumers;
    }
    public async findByEmail(email:string):Promise<CustumerEntity|undefined>{
        const emails = await this.findOne({
            where:{
                email
            },

        });

        return emails;
    }
    public async ExistsCustumerWithEmail(email:string):Promise<boolean>{
        const exists = await this.count({
            where:{
                email
            }
        });
        if(exists){
            return true;
        }
        return false;
    }
    public async findById(id:number):Promise<CustumerEntity|undefined>{
        const custumer = await this.findOne(id);
        return custumer;
    }
}
