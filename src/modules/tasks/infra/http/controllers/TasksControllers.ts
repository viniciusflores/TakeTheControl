import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';

export default class TasksControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { title, description, status } = request.body;

    const createTask = container.resolve(CreateTaskService);

    const task = await createTask.execute({
      user_id,
      title,
      description,
      status,
    });

    return response.json(classToClass(task));
  }
}
