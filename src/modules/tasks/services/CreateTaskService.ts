import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

interface IRequest {
  user_id: string;
  title: string;
  description: string | null;
  status: string;
}

@injectable()
class CreateTaskService {
  constructor(
    @inject('TasksRepository') private tasksRepository: ITasksRepository,
  ) { }

  public async execute({
    user_id,
    title,
    description,
    status,
  }: IRequest): Promise<Task> {
    const task = await this.tasksRepository.create({
      user_id,
      title,
      description,
      status,
    });

    return task;
  }
}

export default CreateTaskService;
