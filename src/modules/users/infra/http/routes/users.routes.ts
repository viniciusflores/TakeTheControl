import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import UsersController from '@modules/users/infra/http/controllers/UsersControllers'

const usersRouter = Router()
const usersController = new UsersController

usersRouter.post('/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
)

export default usersRouter
