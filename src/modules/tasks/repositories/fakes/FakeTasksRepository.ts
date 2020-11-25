import { uuid } from 'uuidv4';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

class FakeTasksRepository implements ITasksRepository {
  findById(id: string): Promise<Task | undefined> {
    throw new Error('Method not implemented.');
  }

  delete(task_id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  save(data: any): Promise<Task> {
    throw new Error('Method not implemented.');
  }

  private tasks: Task[] = [];

  public async create(taskData: ICreateTaskDTO): Promise<Task> {
    const task = new Task();

    Object.assign(task, { id: uuid }, taskData);

    this.tasks.push(task);

    return task;
  }

  public async list(user_id: string): Promise<Task[]> {
    const userTasks = this.tasks.filter((task) => {
      return task.user_id === user_id;
    });

    return userTasks;
  }
}

export default FakeTasksRepository;
