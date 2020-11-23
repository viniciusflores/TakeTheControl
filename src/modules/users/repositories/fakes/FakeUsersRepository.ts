import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid }, userData);

    this.users.push(user);

    return user;
  }

  public async findByEmail(id: string): Promise<User | undefined> {
    const findUser = this.users.find((user) => user.id === id);

    return findUser;
  }
}

export default FakeUsersRepository;
