
import AppError from "@shared/erros/AppError";
import { getCustomRepository } from "typeorm";
import CustumerEntity from "../typeorm/entities/CustumerEntity";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";


export default class ShowCustumerService{
    public async execute(id:number):Promise<CustumerEntity>{
        const custumerRepository = getCustomRepository(CustumersRepository);
        const custumer = await custumerRepository.findById(id);
        if(!custumer){
            throw new AppError('custumer not Found.',404)
        }
        return custumer;
    }
}