import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UserRepository from "../typeorm/repository/UserRepository";


export default class ShowUserService{
    public async execute(id:number):Promise<UserEntity | undefined>{
        const userRepository = getCustomRepository(UserRepository);
        const user = userRepository.findOne(id);
        if(!user){
            throw new AppError('User not Found.',404)
        }
        return user
    }
}