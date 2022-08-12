import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import CustumerEntity from "../typeorm/entities/CustumerEntity";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";

interface IRequest{
    id:number;
    firstName:string;
    secondName:string;
    email:string;
}

export default class UpdateCustumerService{

    public async execute({id,firstName,secondName,email}:IRequest):Promise<CustumerEntity>{

        const custumerRepository = getCustomRepository(CustumersRepository);
        const custumer = await custumerRepository.findOne(id);
        if(!custumer){
            throw new AppError('custumer not found.',404);
        }
        if(custumer.email != email){
            const existsCWEmail = await custumerRepository.ExistsCustumerWithEmail(email);
            if(existsCWEmail){
                throw new AppError('Email address already used.');
            }
            custumer.email = email;
        }
        if(custumer.firstName != firstName){
            custumer.firstName = firstName;
        }
        if(custumer.secondName != secondName){
            custumer.secondName = secondName;
        }
        
        await custumerRepository.save(custumer);

        return custumer;

    }
}