import { injectable, inject } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

interface IRequest {
  user_id: string;
  title: string;
  status: string;
}

@injectable()
class CreateTaskServices {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository,
  ) { }

  public async execute({ user_id, title, status }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.create({
      user_id,
      title,
      status,
    });

    return task;
  }
}

export default CreateTaskServices;
