import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import SessionController from '../controllers/SessionControllers';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default sessionRouter;
