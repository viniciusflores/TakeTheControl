import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

export default interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  list(user_id: string): Promise<Task[]>;
  findById(id: string): Promise<Task | undefined>;
  delete(id: string): Promise<void>;
  save(task: Task): Promise<Task>;
}
