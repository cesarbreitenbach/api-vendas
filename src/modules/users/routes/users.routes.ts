import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/usersControllers';
import isAuthenticated from '../middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const userController = new UsersController();
const avatarController = new UserAvatarController();

const upload = multer(uploadConfig);

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

userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  avatarController.update,
);

export default userRouter;
