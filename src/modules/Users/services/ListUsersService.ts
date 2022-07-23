import { getCustomRepository } from "typeorm";
import UserEntity from "../typeorm/entities/UserEntity";
import UserRepository from "../typeorm/repository/UserRepository";

export default class ListUsersService{
    public async execute():Promise<UserEntity[]>{
        const usersRepository = getCustomRepository(UserRepository);
        const users = await usersRepository.find();
        return users;

    }
}