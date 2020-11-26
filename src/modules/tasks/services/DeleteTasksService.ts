import { injectable, inject } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DeleteTasksService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository,
  ) { }

  public async execute({ id, user_id }: IRequest): Promise<void> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found');
    }

    if (task.user_id !== user_id) {
      throw new AppError('Invalid user of task');
    }

    await this.tasksRepository.delete(task.id);
  }
}

export default DeleteTasksService;
