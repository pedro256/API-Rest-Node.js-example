import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm"
import CustumersRepository from "../typeorm/repositories/CustumersRepository";

interface IRequest{
    id:number
}

export default class DeleteCustumerService{
    public async execute({id}:IRequest):Promise<void>{
        const custumerRepository = getCustomRepository(CustumersRepository);
        const custumer = await custumerRepository.findOne(id);
        if(!custumer){
            throw new AppError('Custumer not found.',404);
        }
        await custumerRepository.remove(custumer);

    }
}