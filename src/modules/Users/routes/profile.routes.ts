import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';

import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import ProfileController from "../controllers/ProfileController";

const profileRoutes = Router();
const profileController = new ProfileController();


profileRoutes.put(
    '/',
    isAuthenticated
    ,
    celebrate({
        [Segments.BODY]:{
            firstName:Joi.string().required(),
            secondName:Joi.string().required(),
            email:Joi.string().email().required()
        }
    })
    ,
    profileController.update
)

profileRoutes.put(
    '/password',
    isAuthenticated
    ,
    celebrate({
        [Segments.BODY]:{
            password: Joi.string().required(),
            oldPassword:Joi.string().required()
        }
    })
    ,
    profileController.update
)


export default profileRoutes;
