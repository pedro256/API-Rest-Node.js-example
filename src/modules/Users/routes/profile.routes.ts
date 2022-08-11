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
            firstName:Joi.string().required().min(1),
            secondName:Joi.string().required().min(1),
            email:Joi.string().email().required().min(1)
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
            password: Joi.string().required().min(1),
            oldPassword:Joi.string().required().min(1)
        }
    })
    ,
    profileController.update
)


export default profileRoutes;
