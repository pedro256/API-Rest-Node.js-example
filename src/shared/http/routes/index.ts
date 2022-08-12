import custumersRouter from '@modules/Custumers/routes/custumers.routes';
import productsRouter from '@modules/Products/routes/products.routes';
import passwordRoutes from '@modules/Users/routes/password.routes';
import sessionsRoutes from '@modules/Users/routes/sessions.routes';
import userRoutes from '@modules/Users/routes/users.routes';
import {Router} from 'express';

const routes = Router();

routes.use('/products',productsRouter);
routes.use('/users',userRoutes);
routes.use('/sessions',sessionsRoutes);
routes.use('/password',passwordRoutes);
routes.use("/custumers",custumersRouter);

routes.get("/",(request,response)=>{
    return response.json({
        version:'1.0.1',
        name:'API Vendas',
        description:'',
    })
})


export default routes;
