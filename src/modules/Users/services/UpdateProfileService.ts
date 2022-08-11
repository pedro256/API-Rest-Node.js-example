import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UserRepository from "../typeorm/repository/UserRepository";

interface IRequest{
    id:number;
    firstName:string;
    secondName:string;
    email:string;
}

export default class UpdateProfileService{

    public async execute({id,firstName,secondName,email}:IRequest):Promise<UserEntity>{

        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(id);
        if(!user){
            throw new AppError('User not found.',404);
        }
        if(user.email != email){
            const existsUWEmail = await userRepository.ExistsUserWithEmail(email);
            if(existsUWEmail){
                throw new AppError('Email address already used.');
            }
            user.email = email;
        }
        if(user.firstName != firstName){
            user.firstName = firstName;
        }
        if(user.secondName != secondName){
            user.secondName = secondName;
        }
        
        await userRepository.save(user);

        return user;

    }
}