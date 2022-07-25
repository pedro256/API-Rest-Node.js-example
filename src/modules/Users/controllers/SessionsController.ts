import {Request,Response} from 'express'
import CreateSessionUserService from '../services/CreateSessionUserService';


export default class SessionsController{

    public async create(req:Request,res:Response):Promise<Response>{
        const {email,password} = req.body;
        const createSession = new CreateSessionUserService();
        const user = await createSession.execute({username:email,password});
        return res.json(user);
    }
}
