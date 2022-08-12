import AppError from "@shared/erros/AppError"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import UserEntity from "../typeorm/entities/UserEntity"
import UserRepository from "../typeorm/repositories/UserRepository"
import authConfig from '@config/auth'

interface IRequest{
    username:string,
    password:string
}
interface IResponse{
    user:UserEntity,
    token:string
}
export default class CreateSessionUserService{
    public async execute({username,password}:IRequest):Promise<IResponse>{
        const userRepository = getCustomRepository(UserRepository);
        const user = await (await userRepository.findByEmail(username));
        if(!user){
            throw new AppError('Error Credentials.',401);
        }
        const passConfirm = await compare(password,user.password);
        if(!passConfirm){
            throw new AppError('Error Credentials.',401);
        }

        const  token = sign(
            {},
            authConfig.jwt.secret,
            {
                subject:user.id.toString(),
                expiresIn:authConfig.jwt.expiresIn,
            }
            );

        return {
            user,
            token
        } as IResponse;
    }
}
