import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdatePasswordService from "../services/UpdatePasswordService";
import UpdateProfileService from "../services/UpdateProfileService";

export default class ProfileController{

    public async show(req:Request,res:Response):Promise<Response>{
        const showProfile = new ShowProfileService();
        const uId = req.user.id;

        const user = await showProfile.execute(uId);
        return res.json(user);
    }

    public async update(req:Request,res:Response):Promise<Response>{
        const uId = req.user.id;
        const {firstName,secondName,email} = req.body;

        const updateProfile = new UpdateProfileService();

        const user = await updateProfile.execute({
            id:uId,
            firstName,
            secondName,
            email
        });

        return res.json(user);

    }

    public async updatePassword(req:Request,res:Response):Promise<Response>{
        const uId = req.user.id;
        const {oldPassword,password} = req.body;

        const updateProfilePassword = new UpdatePasswordService();

        const user = await updateProfilePassword.execute({
            id:uId,
            oldPassword,
            password
        });

        return res.json(user);
    }

}