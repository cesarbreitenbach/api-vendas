import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import UsersController from '../controllers/usersControllers';
import isAuthenticated from '../middlewares/isAuthenticated';

const userRouter = Router();
const userController = new UsersController();

userRouter.get('/', isAuthenticated, userController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

export default userRouter;
