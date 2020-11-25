import { injectable, inject } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
  title: string;
  status: string;
}

@injectable()
class UpdateTaskServices {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository,
  ) { }

  public async execute({ id, title, status }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found');
    }

    task.title = title;
    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }
}

export default UpdateTaskServices;
