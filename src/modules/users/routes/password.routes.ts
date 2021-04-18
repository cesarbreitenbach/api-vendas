import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const passwordForgotController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  passwordForgotController.create,
);

export default passwordRouter;
