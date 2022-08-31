import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate'
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import OrderController from "../controllers/OrderController";
const ordersRouter = Router();
const ordersController = new OrderController();

ordersRouter.get(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required()
        }
    })
    , ordersController.show);

ordersRouter.post('/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            custumer_id: Joi.number().required().min(1),
            products: Joi.required()
        }
    })
    , ordersController.create);

export default ordersRouter;
