import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import multer from "multer";
import uploadConfig from '@config/upload'
import UserController from "../controllers/UserController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController";

const userRoutes = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig);

userRoutes.get('/',isAuthenticated,usersController.index);

userRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]:{
            firstName:Joi.string().required(),
            secondName:Joi.string().required(),
            email:Joi.string().email().required(),
            password:Joi.string().required()
        }
    })
    ,
    usersController.create
)

userRoutes.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    usersAvatarController.update
,
)

export default userRoutes;
