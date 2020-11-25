import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import CreateTaskService from '@modules/tasks/services/CreateTaskService';
import AppError from '@shared/errors/AppError';

let fakeTasksRepository: FakeTasksRepository;
let createTask: CreateTaskService;

describe('CreateTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    createTask = new CreateTaskService(fakeTasksRepository);
  });

  it('Should be able to create a new task', async () => {
    const task = await createTask.execute({
      description: 'New Task',
      title: 'Do it as soon as possible',
      status: 'open',
      user_id: '123',
    });

    expect(task).toHaveProperty('id');
    expect(task.description).toBe('New Task');
    expect(task.status).toBe('open');
  });
});
