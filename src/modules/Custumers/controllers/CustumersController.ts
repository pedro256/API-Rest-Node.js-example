import { Request, Response } from "express";
import CreatecustumerService from "../services/CreateCustumerService";
import DeleteCustumerService from "../services/DeleteCustumerService";
import ListCustumersService from "../services/ListCustumersService";
import ShowCustumerService from "../services/ShowCustumerService";
import UpdateCustumerService from "../services/UpdateCustumerService";



export default class CustumersController{

    public async index(request:Request,response:Response):Promise<Response>{
        const listCustumers = new ListCustumersService();
        const custumers = await listCustumers.execute();
        return response.json(custumers);
    }

    public async show(request:Request,response:Response):Promise<Response>{
        const {id}=request.params;
        const idParam = Number.parseInt(id);
        const showCustumer = new ShowCustumerService();
        const custumer = await showCustumer.execute(idParam);
        return response.json(custumer);
    }
    public async create(request:Request,response:Response):Promise<Response>{
        const {firstName, secondName,email}=request.body;
        const createCustumer = new CreatecustumerService();
        const custumer = createCustumer.execute({
                firstName,
                secondName,
                email
            });
        return response.json(custumer)
    }

    public async update(request:Request,response:Response):Promise<Response>{
        const {firstName, secondName,email}=request.body;
        const {id}=request.params;
        const idParam = Number.parseInt(id);
        const updateCustumer = new UpdateCustumerService();
        const custumer = await updateCustumer.execute({
            id:idParam,
            firstName,
            secondName,
            email
        });
        return response.json(custumer)
    }

    public async delete(request:Request,response:Response):Promise<Response>{
        const {id}=request.params;
        const idParam = Number.parseInt(id);
        const deleteCustumer = new DeleteCustumerService();
        await deleteCustumer.execute({
            id:idParam
        })
        return response.json([])
    }
}