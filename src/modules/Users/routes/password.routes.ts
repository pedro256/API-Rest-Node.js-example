import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate'
import ForgotPassController from "../controllers/ForgotPassController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const passwordRoutes = Router();
const passwordController = new ForgotPassController();
const resetController = new ResetPasswordController();


passwordRoutes.post(
    "/forgot",
    celebrate({
        [Segments.BODY]:{
            email:Joi.string().email().required()
        }
    }),
    passwordController.create
);

passwordRoutes.post(
    "/reset",
    celebrate({
        [Segments.BODY]:{
            token: Joi.string().uuid().required(),
            password:Joi.string().required(),
            password_confirmation: Joi.string().required().valid(Joi.ref('password'))
        }
    }),
    resetController.create
);




export default passwordRoutes;
