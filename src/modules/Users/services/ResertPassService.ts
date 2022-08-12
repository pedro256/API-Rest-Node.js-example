import AppError from "@shared/erros/AppError";
import { hash } from "bcryptjs";
import { isAfter,addHours } from "date-fns";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

interface IRequest{
    token:string;
    password:string;
}

export default class ResertPassService{
    public async execute({token,password}:IRequest):Promise<void>{
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokenRepository.findByToken(token)
        if(!userToken){
            throw new AppError('User Token does not exists.',404)
        }
        const user = await userRepository.findById(userToken.userId);

        if(!user){
            throw new AppError('User does not exists.',404)
        }

        const tokenCreatedAt = userToken.createdAt;
        const compareDate = addHours(tokenCreatedAt,2);
        if(isAfter(Date.now(),compareDate)){
            throw new AppError('Token expired.')
        }


        user.password = await hash(password,8);

        await userRepository.save(user);
    }
}
