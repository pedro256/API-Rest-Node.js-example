import AppError from "@shared/erros/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UserRepository from "../typeorm/repository/UserRepository";

interface IRequest{
    id:number;
    password:string;
    oldPassword:string;
}
/**
 * @description if user knows your password but want change
 */
export default class UpdatePasswordService{

    public async execute({id,password,oldPassword}:IRequest):Promise<UserEntity>{

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(id);
        if(!user){
            throw new AppError('User not found.',404);
        }
        
        const checkOldPassword = await compare(oldPassword,user.password);

        if(checkOldPassword){
            if(password!=oldPassword){
                user.password = await hash(password,8);
            }
        }else{
            throw new AppError("Password does not match.")
        }
        
        await userRepository.save(user);

        return user;

    }
}