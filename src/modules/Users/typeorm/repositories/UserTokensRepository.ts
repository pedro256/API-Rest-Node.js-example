import { EntityRepository, Repository } from "typeorm";
import UserTokenEntity from "../entities/UserTokenEntity";

@EntityRepository(UserTokenEntity)
export default class UserTokensRepository extends Repository<UserTokenEntity>{

    public async findByToken(token:string):Promise<UserTokenEntity|undefined>{
        const userToken = await this.findOne({
            where:{
                token
            }
        });
        return userToken;
    }
    public async generate(userId:number):Promise<UserTokenEntity|undefined>{
        const userToken = await this.create({
            userId
        });
        await this.save(userToken)
        return userToken;
    }
}
