import { EntityRepository, Repository } from "typeorm";
import UserEntity from "../entities/UserEntity";


@EntityRepository(UserEntity)
export default class UserRepository extends Repository<UserEntity>{

    public async findByName(firstName:string,secondName:string):Promise<UserEntity[]|undefined>{
        const users = await this.find({
            where:{
                firstName,
                secondName
            }
        })
        return users;
    }
    public async findByEmail(email:string):Promise<UserEntity|undefined>{
        const emails = await this.findOne({
            where:{
                email
            },

        });

        return emails;
    }
    public async ExistsUserWithEmail(email:string):Promise<boolean>{
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
}
