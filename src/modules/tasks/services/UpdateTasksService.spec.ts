import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import UpdateTasksService from '@modules/tasks/services/UpdateTasksService';
import AppError from '@shared/errors/AppError';

let fakeTasksRepository: FakeTasksRepository;
let updateTask: UpdateTasksService;

describe('UpdateTask', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    updateTask = new UpdateTasksService(fakeTasksRepository);
  });

  it('Should be able to update a task', async () => {
    const task = await fakeTasksRepository.create({
      title: 'New Task',
      status: 'open',
      user_id: '123',
    });

    expect(task.title).toBe('New Task');
    expect(task.status).toBe('open');

    const updatedTask = await updateTask.execute({
      id: task.id,
      user_id: '123',
      title: 'Updated title',
      status: 'closed',
    });

    const { id, title, status } = updatedTask;

    expect(id).toBe(task.id);
    expect(title).toBe('Updated title');
    expect(status).toBe('closed');
  });

  it('Should not be able to update a invalid task', async () => {
    await expect(
      updateTask.execute({
        id: 'invalid',
        title: 'New Task',
        status: 'open',
        user_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
