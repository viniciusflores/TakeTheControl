import { injectable, inject } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class FindTaskByIdService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository,
  ) { }

  public async execute({ user_id }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.findById(user_id);

    if (!task) {
      throw new AppError('Task not found');
    }

    return task;
  }
}

export default FindTaskByIdService;
