import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UserRepository from "../typeorm/repository/UserRepository";

interface IRequest{
    firstName:string;
    secondName:string;
    email:string;
    password:string;
}

export default class CreateUserService{
    public async execute({firstName,secondName,email,password}:IRequest):Promise<UserEntity>{
        const userRepository = getCustomRepository(UserRepository);
        const existsUWEmail = await userRepository.ExistsUserWithEmail(email);
        
        if(existsUWEmail){
            throw new AppError('Email address already used.');
        }

        const user = userRepository.create({
            firstName,
            secondName,
            email,
            password
        })

        try {
            await userRepository.save(user);
        } catch (error) {
            throw new AppError('err')
        }
        

        return user;
        
    }
}