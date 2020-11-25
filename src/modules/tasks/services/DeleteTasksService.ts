import { injectable, inject } from 'tsyringe';

import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteTasksService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository,
  ) { }

  public async execute(id: string): Promise<void> {
    const task = await this.tasksRepository.findById(id);

    if (!task) {
      throw new AppError('Task not found');
    }

    await this.tasksRepository.delete(task.id);
  }
}

export default DeleteTasksService;
