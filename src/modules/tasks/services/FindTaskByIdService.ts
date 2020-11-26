import { injectable, inject } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';
import AppError from '@shared/errors/AppError';

@injectable()
class FindTaskByIdService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository,
  ) { }

  public async execute(id: string): Promise<Task> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found');
    }

    return task;
  }
}

export default FindTaskByIdService;
