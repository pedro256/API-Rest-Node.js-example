import { Request, Response } from "express";
import SendForgotPassService from "../services/SendForgotPassService";


export default class ForgotPassController {

    public async create(req:Request,res:Response):Promise<Response>{
        const { email} = req.body;
        const sendForgotPassword = new SendForgotPassService();
        await sendForgotPassword.execute({
            email
        })
        return res.status(204).json()
    }


}
