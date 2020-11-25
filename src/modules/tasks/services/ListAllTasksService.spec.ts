import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import CreateTasksService from '@modules/tasks/services/CreateTasksService';
import ListAllTasksService from '@modules/tasks/services/ListAllTasksService';

let fakeTasksRepository: FakeTasksRepository;
let createTask: CreateTasksService;
let listAllTasksService: ListAllTasksService;

describe('CreateTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    createTask = new CreateTasksService(fakeTasksRepository);
    listAllTasksService = new ListAllTasksService(fakeTasksRepository);
  });

  it('Should be able to list all tasks', async () => {
    await createTask.execute({
      title: 'New Task One',
      status: 'open',
      user_id: '123',
    });

    await createTask.execute({
      title: 'New Task Two',
      status: 'closed',
      user_id: '123',
    });

    const tasks = await listAllTasksService.execute({ user_id: '123' });

    expect(tasks.length).toBe(2);
    expect(tasks[0]).toHaveProperty('id');
    expect(tasks[0].title).toBe('New Task One');
    expect(tasks[1].title).toBe('New Task Two');
    expect(tasks[0].status).toBe('open');
    expect(tasks[1].status).toBe('closed');
  });

  it('Should not be possible to see appointments', async () => {
    const tasks = await listAllTasksService.execute({
      user_id: 'inexistentUser',
    });
    expect(tasks.length).toBe(0);
  });
});
