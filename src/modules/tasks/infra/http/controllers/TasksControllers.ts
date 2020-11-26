import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreateTasksService from '@modules/tasks/services/CreateTasksService';
import DeleteTasksService from '@modules/tasks/services/DeleteTasksService';
import FindTaskByIdService from '@modules/tasks/services/FindTaskByIdService';
import ListAllTasksService from '@modules/tasks/services/ListAllTasksService';
import UpdateTasksService from '@modules/tasks/services/UpdateTasksService';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listTasks = container.resolve(ListAllTasksService);

    const tasks = await listTasks.execute({ user_id });

    return response.json(classToClass(tasks));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findTaskById = container.resolve(FindTaskByIdService);

    const tasks = await findTaskById.execute(id);

    return response.json(classToClass(tasks));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;
    const { title, status } = request.body;

    const updateTask = container.resolve(UpdateTasksService);

    const task = await updateTask.execute({ id, user_id, title, status });

    return response.json(classToClass(task));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;

    const deleteTask = container.resolve(DeleteTasksService);

    const task = await deleteTask.execute({ id, user_id });

    return response.json(classToClass(task));
  }
}
