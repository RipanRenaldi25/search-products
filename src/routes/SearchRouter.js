import { Router } from 'express';
import { getAllData, getProductById, getProductsByTitle } from '../controller/ProductController.js';
const SearchRouter = Router();

SearchRouter.get('/products', getAllData);
SearchRouter.get('/product/:id', getProductById);
SearchRouter.get('/products/search/', getProductsByTitle);
export default SearchRouter;