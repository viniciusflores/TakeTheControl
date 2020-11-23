import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthentication';
import TasksController from '@modules/tasks/infra/http/controllers/TasksControllers';

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.use(ensureAuthenticated);

tasksRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string(),
      status: Joi.string().required(),
    },
  }),

  tasksController.create,
);

export default tasksRouter;
