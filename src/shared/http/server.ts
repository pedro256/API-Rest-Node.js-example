import 'reflect-metadata';
import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express';
import AppError from '@shared/erros/AppError';
import {errors} from 'celebrate'
import { pagination } from 'typeorm-pagination';
import cors from 'cors';
import routes from './routes';
import '@shared/typeorm'
import uploadConfig from '@config/upload'


const PORT = 3000
const HOST ='0.0.0.0'
const app = express();
app.use(cors())
app.use(express.json())
app.use(pagination)
app.use("/file",express.static(uploadConfig.directory))
app.use(routes);
app.use(errors());
app.use(
    (error:Error,request:Request,response:Response,next:NextFunction)=>{
        if(error instanceof AppError){
            return response.status(error.status).json({
                status:'error',
                message:error.message
            });
        }
        return response.status(500).json({
            status:'error',
            message:'Internal Server Erro'
        })
    }
)


app.listen(PORT,HOST,()=>{
    console.log('Listening')
})

