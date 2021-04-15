import { Router } from 'express';
import productsRouter from '@modules/products/routes/teste.routes';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
