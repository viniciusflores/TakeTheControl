import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

export default interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  listAllTasks(user_id: string): Promise<Task[]>;
}
