import productsRouter from '@modules/Products/routes/products.routes';
import sessionsRoutes from '@modules/Users/routes/sessions.routes';
import userRoutes from '@modules/Users/routes/users.routes';
import {Router} from 'express';

const routes = Router();

routes.use('/products',productsRouter);
routes.use('/users',userRoutes);
routes.use('/sessions',sessionsRoutes);

routes.get("/",(request,response)=>{
    return response.json({Alive:"Y"})
})


export default routes;
