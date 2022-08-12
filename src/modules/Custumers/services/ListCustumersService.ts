import { getCustomRepository } from "typeorm";
import CustumerEntity from "../typeorm/entities/CustumerEntity";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";

export default class ListCustumersService{
    public async execute():Promise<CustumerEntity[]>{
        const custumersRepository = getCustomRepository(CustumersRepository);
        const custumers = await custumersRepository.find({
            order:{
                id:"ASC"
            }
        });
        return custumers;
    }
}