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
      status: Joi.string().required(),
    },
  }),

  tasksController.create,
);

tasksRouter.get('/', tasksController.index);

tasksRouter.get('/:id', tasksController.show);

tasksRouter.put('/:id', tasksController.update);

tasksRouter.delete('/:id', tasksController.delete);

export default tasksRouter;
