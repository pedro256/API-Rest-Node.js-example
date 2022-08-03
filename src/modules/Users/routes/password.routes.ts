import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate'
import ForgotPassController from "../controllers/ForgotPassController";

const passwordRoutes = Router();
const passwordController = new ForgotPassController();


passwordRoutes.post(
    "/forgot",
    celebrate({
        [Segments.BODY]:{
            email:Joi.string().email().required()
        }
    }),
    passwordController.create
);

export default passwordRoutes;
