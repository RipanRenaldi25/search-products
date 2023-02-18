import { Router } from 'express';
import { getAllData, getProductById, getProductsByTitle } from '../controller/ProductController.js';
import cache from '../middleware/cache.js';
const SearchRouter = Router();

SearchRouter.get('/products', cache(10000), getAllData);
SearchRouter.get('/product/:id', getProductById);
SearchRouter.get('/products/search/', getProductsByTitle);
export default SearchRouter;