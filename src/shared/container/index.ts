import { container } from 'tsyringe'

import '@modules/users/providers'
// import '@shared/container/providers'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UserRepository,
)
