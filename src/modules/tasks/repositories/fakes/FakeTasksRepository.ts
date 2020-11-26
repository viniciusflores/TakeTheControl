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

  public async list(user_id: string): Promise<Task[]> {
    const userTasks = this.tasks.filter((task) => task.user_id === user_id);

    return userTasks;
  }

  public async findById(id: string): Promise<Task | undefined> {
    const task = this.tasks.find((t) => t.id === id);

    return task;
  }

  public async delete(id: string): Promise<void> {
    this.tasks.filter((task) => task.id === id);
  }

  public async save(task: Task): Promise<Task> {
    const findIndex = this.tasks.findIndex(
      (findTask) => findTask.id === task.id,
    );

    this.tasks[findIndex] = task;

    return task;
  }
}

export default FakeTasksRepository;
