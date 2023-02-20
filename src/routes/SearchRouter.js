import { Router } from 'express';
import { getAllProducts, getProductById, getProductCategories, getProductsByCategory, getProductsByTitle } from '../controller/ProductController.js';
import cache from '../middleware/cache.js';
const SearchRouter = Router();

SearchRouter.get('/products', cache(10000), getAllProducts);
SearchRouter.get('/product/:id', getProductById);
SearchRouter.get('/products/search', getProductsByTitle);
SearchRouter.get("/products/categories", getProductCategories);
SearchRouter.get("/products/:category", getProductsByCategory);

export default SearchRouter;