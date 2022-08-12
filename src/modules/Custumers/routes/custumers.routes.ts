import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate'
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import CustumersController from "../controllers/CustumersController";
const custumersRouter = Router();
const custumersController = new CustumersController();

custumersRouter.get('/', custumersController.index);
custumersRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required()
        }
    })
    , custumersController.show);

custumersRouter.post('/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            firstName:Joi.string().required().min(1),
            secondName:Joi.string().required().min(1),
            email:Joi.string().email().required().min(1)
        }
    })
    , custumersController.create);
custumersRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required()
        },
        [Segments.BODY]: {
            firstName:Joi.string().required().min(1),
            secondName:Joi.string().required().min(1),
            email:Joi.string().email().required().min(1)
        }
    })
    , custumersController.update);
custumersRouter.delete('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required()
        }
    })
    , custumersController.delete);

export default custumersRouter;
