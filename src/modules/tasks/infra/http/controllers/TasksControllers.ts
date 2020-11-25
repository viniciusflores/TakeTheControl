import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateTasksService from '@modules/tasks/services/CreateTasksService';
import ListAllTasksService from '@modules/tasks/services/ListAllTasksService';

export default class TasksControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { title, status } = request.body;

    const createTask = container.resolve(CreateTasksService);

    const task = await createTask.execute({
      user_id,
      title,
      status,
    });

    return response.json(classToClass(task));
  }

  public async listAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const user_id = request.user.id;

    const listAllTasks = container.resolve(ListAllTasksService);

    const tasks = await listAllTasks.execute({ user_id });

    return response.json(classToClass(tasks));
  }
}
