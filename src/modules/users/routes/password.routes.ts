import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();
const passwordForgotController = new ForgotPasswordController();
const resetPassordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordForgotController.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPassordController.create,
);

export default passwordRouter;
