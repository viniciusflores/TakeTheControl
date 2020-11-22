import { getRepository, Repository, Not } from 'typeorm'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'
import User from '@modules/users/infra/typeorm/entities/User'

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } })
    return user
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)
    await this.ormRepository.save(user)
    return user
  }
}

export default UsersRepository
