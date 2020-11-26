import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import DeleteTasksService from '@modules/tasks/services/DeleteTasksService';
import AppError from '@shared/errors/AppError';

let fakeTasksRepository: FakeTasksRepository;
let deleteTask: DeleteTasksService;

describe('Delete Task', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    deleteTask = new DeleteTasksService(fakeTasksRepository);
  });

  it('Should be able to delete a task', async () => {
    const task = await fakeTasksRepository.create({
      title: 'New Task',
      status: 'open',
      user_id: '123',
    });

    const { id, user_id } = task;

    await deleteTask.execute({ id, user_id });

    const allTasksFromUser = fakeTasksRepository.list(user_id);

    expect(allTasksFromUser).toEqual(expect.not.objectContaining(task));
  });

  it('Should not be able to delete a invalid task', async () => {
    await expect(
      deleteTask.execute({
        id: '',
        user_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to delete a invalid task', async () => {
    const task = await fakeTasksRepository.create({
      title: 'New Task',
      status: 'open',
      user_id: '123',
    });

    await expect(
      deleteTask.execute({
        id: task.id,
        user_id: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
