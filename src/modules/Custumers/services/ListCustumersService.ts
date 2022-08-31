import IPaginationItems from "@shared/typeorm/pagination/IPaginationItem";
import { getCustomRepository } from "typeorm";
import CustumerEntity from "../typeorm/entities/CustumerEntity";
import CustumersRepository from "../typeorm/repositories/CustumersRepository";

export default class ListCustumersService{
    public async execute():Promise<IPaginationItems<CustumerEntity>>{
        const custumersRepository = getCustomRepository(CustumersRepository);
        const custumers = await custumersRepository.createQueryBuilder().paginate();
       
        return custumers as IPaginationItems<CustumerEntity>;
    }
}