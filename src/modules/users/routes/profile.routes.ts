import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import isAuthenticated from '../middlewares/isAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().optional(),
      confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', { is: Joi.exist(), then: Joi.required() }),
      old_password: Joi.string(),
    },
  }),
  profileController.update,
);

export default profileRouter;
