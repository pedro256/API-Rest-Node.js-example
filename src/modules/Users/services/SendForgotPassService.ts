import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repository/UserRepository";
import UserTokensRepository from "../typeorm/repository/UserTokensRepository";

interface IRequest{
    email:string;
}

export default class SendForgotPassService{
    public async execute({email}:IRequest):Promise<void>{
        const userRepository = getCustomRepository(UserRepository);
        const userTokenRepository = getCustomRepository(UserTokensRepository);

        const user = await userRepository.findByEmail(email)
        if(!user){
            throw new AppError('User not Found.',404)
        }

        const token = await userTokenRepository.generate(user.id);
        console.log(token)

    }
}
