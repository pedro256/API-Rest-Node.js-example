import EtherialMail from "@config/mail/EtherealMail";
import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import UserRepository from "../typeorm/repositories/UserRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";

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

        EtherialMail.sendMail({
            to:email,
            body: `Solicitação de redefinição de senha recebida !!\n Token de Solicitação: ${token?.token} .`
        })
    }
}
