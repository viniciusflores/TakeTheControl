import { injectable, inject } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

interface IRequest {
  user_id: string;
}

@injectable()
class ListAllTasksService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository,
  ) { }

  public async execute({ user_id }: IRequest): Promise<Task[]> {
    const tasks = this.tasksRepository.list(user_id);

    return tasks;
  }
}

export default ListAllTasksService;
