import { uuid } from 'uuidv4';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

class FakeTasksRepository implements ITasksRepository {
  private tasks: Task[] = [];

  public async create(taskData: ICreateTaskDTO): Promise<Task> {
    const task = new Task();

    Object.assign(task, { id: uuid }, taskData);

    this.tasks.push(task);

    return task;
  }

  public async listAllTasks(): Promise<Task[]> {
    const { tasks } = this;
    return tasks;
  }
}

export default FakeTasksRepository;
