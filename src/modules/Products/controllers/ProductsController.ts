import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";



export default class ProductsController{

    public async index(request:Request,response:Response):Promise<Response>{
        const listProducts = new ListProductService();
        const products = await listProducts.execute();
        return response.json(products);
    }

    public async show(request:Request,response:Response):Promise<Response>{
        const {id}=request.params;
        const idParam = Number.parseInt(id);
        const showProduct = new ShowProductService();
        const product = await showProduct.execute(idParam);
        return response.json(product);
    }
    public async create(request:Request,response:Response):Promise<Response>{
        const {name,description,price,quantity}=request.body;
        const createProduct = new CreateProductService();
            const product = createProduct.execute({
                name,
                description,
                price,
                quantity
            });
            return response.json(product)
    }

    public async update(request:Request,response:Response):Promise<Response>{
        const {name,description,price,quantity}=request.body;
        const {id}=request.params;
        const idParam = Number.parseInt(id);
        const updateProduct = new UpdateProductService();
        const product = await updateProduct.execute({
            id:idParam,
            name,
            price,
            quantity,
            description
        })
        return response.json(product)
    }

    public async delete(request:Request,response:Response):Promise<Response>{
        const {id}=request.params;
        const idParam = Number.parseInt(id);
        const deleteProduct = new DeleteProductService();
        await deleteProduct.execute({
            id:idParam
        })
        return response.json([])
    }
}