import AppError from "@shared/erros/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '@config/auth';


interface ITokenPayload{
    iat:number;
    exp:number;
    sub:string;
}

export default function isAuthenticated(
    req:Request,
    res:Response,
    next:NextFunction
):void{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new AppError('JWT Token is missing.',401)
    }
    const [,token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token,authConfig.jwt.secret);
        const {sub} = decodeToken as ITokenPayload;
        const idNumber =Number.parseInt(sub);
        req.user = {
            id:idNumber
        }
        return next();
    } catch (error) {
        throw new AppError('Invalid JWT Token.',401)
    }

}
