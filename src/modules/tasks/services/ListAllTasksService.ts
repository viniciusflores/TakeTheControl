import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

@injectable()
class ListAllTasksService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository,
  ) { }

  public async execute(): Promise<Task[]> {
    const tasks = this.tasksRepository.listAllTasks();

    return tasks;
  }
}

export default ListAllTasksService;
