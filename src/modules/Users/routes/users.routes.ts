import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate'
import UserController from "../controllers/UserController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const userRoutes = Router();
const usersController = new UserController();

userRoutes.get('/',isAuthenticated,usersController.index);

userRoutes.post('/',
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

export default userRoutes;
