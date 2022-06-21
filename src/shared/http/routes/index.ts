import {Router} from 'express';

const routes = Router();

routes.get("/",(request,response)=>{
    return response.json({test:"Hello"})
})


export default routes;
