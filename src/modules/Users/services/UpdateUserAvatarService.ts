import AppError from "@shared/erros/AppError";
import path from "path";
import fs from 'fs';
import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UserRepository from "../typeorm/repositories/UserRepository";
import uploadConfig from '@config/upload'

interface IRequest{
    avatarFileName:string;
    userId:number;
}
export default class UpdateUserAvatarService{
    public async execute({avatarFileName,userId}:IRequest):Promise<UserEntity>{
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findById(userId);
        if(!user){
            throw new AppError('User Not Found',404);
        }
        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory,user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFileName;
        await userRepository.save(user);
        return user;


    }
}
