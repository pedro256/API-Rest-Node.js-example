import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm"
import UserRepository from "../typeorm/repository/UserRepository"

interface IRequest{
    id:number
}

export default class DeleteUserService{
    public async execute({id}:IRequest):Promise<void>{
        const userRepository = getCustomRepository(UserRepository);
        const user = await userRepository.findOne(id);
        if(!user){
            throw new AppError('User not found.',404);
        }
        await userRepository.remove(user);

    }
}