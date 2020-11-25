import { getRepository, Repository } from 'typeorm';
import ITasksRepository from '@modules/tasks/repositories/ITasksRepository';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';
import Task from '@modules/tasks/infra/typeorm/entities/Task';

class TasksRepository implements ITasksRepository {
  private ormRepository: Repository<Task>;

  constructor() {
    this.ormRepository = getRepository(Task);
  }

  public async create(taskData: ICreateTaskDTO): Promise<Task> {
    const task = this.ormRepository.create(taskData);
    await this.ormRepository.save(task);
    return task;
  }

  public async listAllTasks(user_id: string): Promise<Task[]> {
    const tasks = this.ormRepository.find({
      where: {
        user_id,
      },
    });
    return tasks;
  }
}

export default TasksRepository;