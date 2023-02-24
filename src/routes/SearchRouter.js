import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import { getAllProducts, getProductById, getProductCategories, getProductsByCategory, getProductsByTitle } from '../controller/ProductController.js';
import cache from '../middleware/cache.js';
import options from '../../api.json' assert {type: 'json'};
const SearchRouter = Router();
SearchRouter.use('/api-docs', swaggerUi.serve, swaggerUi.setup(options));
SearchRouter.get('/products', cache(10000), getAllProducts);
SearchRouter.get('/product/:id', getProductById);
SearchRouter.get('/products/keyword', getProductsByTitle);
SearchRouter.get("/products/categories", getProductCategories);
SearchRouter.get("/products/:category", getProductsByCategory);

export default SearchRouter;