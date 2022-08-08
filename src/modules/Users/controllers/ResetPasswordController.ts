import { Request, Response } from "express";
import ResertPassService from "../services/ResertPassService";


export default class ResetPasswordController {

    public async create(req:Request,res:Response):Promise<Response>{
        const { password, token} = req.body;
        const sendForgotPassword = new ResertPassService();
        await sendForgotPassword.execute({
            password,
            token
        })
        return res.status(204).json()
    }


}
