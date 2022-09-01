import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUsersService from "../services/ListUsersService";


export default class UserController {

    public async index(req:Request,res:Response):Promise<Response>{
        const listUser = new ListUsersService();
        const users = await listUser.execute();

        return res.json(classToClass(users));
    }

    public async create(req:Request,res:Response):Promise<Response>{
        const { firstName,secondName,email,password} = req.body;
        const createUser = new CreateUserService();
        const user =  await createUser.execute({
            firstName,
            secondName,
            email,
            password
        });

        return res.json(user)
    }


}
