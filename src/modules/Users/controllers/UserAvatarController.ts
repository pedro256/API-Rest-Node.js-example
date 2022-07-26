import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {

    public async update(req:Request,res:Response):Promise<Response>{
        const updateUserAvatarService = new UpdateUserAvatarService();
        const filename = req.file?.filename||"";
        const user  = await updateUserAvatarService.execute({
            userId:req.user.id,
            avatarFileName:filename
        });
        return res.json(user);
    }


}
