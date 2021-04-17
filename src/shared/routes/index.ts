import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/users.routes';
import sessionRouter from '@modules/users/routes/sessions.routes';

const routes = Router();

routes.use('/products', productsRouter);

routes.use('/users', userRouter);

routes.use('/sessions', sessionRouter);

export default routes;
