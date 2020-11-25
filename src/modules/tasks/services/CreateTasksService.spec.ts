import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import CreateTasksService from '@modules/tasks/services/CreateTasksService';
import AppError from '@shared/errors/AppError';

let fakeTasksRepository: FakeTasksRepository;
let createTask: CreateTasksService;

describe('CreateTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    createTask = new CreateTasksService(fakeTasksRepository);
  });

  it('Should be able to create a new task', async () => {
    const task = await createTask.execute({
      title: 'New Task',
      status: 'open',
      user_id: '123',
    });

    expect(task).toHaveProperty('id');
    expect(task.title).toBe('New Task');
    expect(task.status).toBe('open');
  });
});
