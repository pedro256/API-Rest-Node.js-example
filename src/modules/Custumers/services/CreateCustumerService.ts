import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import CustumerEntity from "../typeorm/entities/CustumerEntity";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";

interface IRequest{
    firstName:string;
    secondName:string;
    email:string;
}

export default class CreatecustumerService{
    public async execute({firstName,secondName,email}:IRequest):Promise<CustumerEntity>{
        const custumerRepository = getCustomRepository(CustumersRepository);

        const existsCWEmail = await custumerRepository.ExistsCustumerWithEmail(email);

        if(existsCWEmail){
            throw new AppError('Email address already used.');
        }

        const custumer = custumerRepository.create({
            firstName,
            secondName,
            email
        })

        await custumerRepository.save(custumer);

        return custumer;

    }
}
