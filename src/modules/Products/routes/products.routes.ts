import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate'
import ProductsController from "../controllers/ProductsController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);
productsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required()
        }
    })
    , productsController.show);

productsRouter.post('/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string().min(0),
            price: Joi.number().min(0.1).required(),
            quantity:  Joi.number().integer().min(0).default(0)
        }
    })
    , productsController.create);
productsRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required()
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string(),
            price: Joi.number().min(0.1).required(),
            quantity: Joi.number().integer().min(0).default(0)
        }
    })
    , productsController.update);
productsRouter.delete('/:id',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.number().integer().min(1).required()
        }
    })
    , productsController.delete);

export default productsRouter;
