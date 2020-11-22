import ICreateUserDTO from "../dtos/ICreateUserDTO";
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
}
