import FakeTasksRepository from '@modules/tasks/repositories/fakes/FakeTasksRepository';
import FindTaskByIdService from '@modules/tasks/services/FindTaskByIdService';
import AppError from '@shared/errors/AppError';

let fakeTasksRepository: FakeTasksRepository;
let findTaskById: FindTaskByIdService;

describe('FindTaskById', () => {
  beforeEach(() => {
    fakeTasksRepository = new FakeTasksRepository();

    findTaskById = new FindTaskByIdService(fakeTasksRepository);
  });

  it('Should be able to find a task by id', async () => {
    const task = await fakeTasksRepository.create({
      title: 'New Task',
      status: 'open',
      user_id: '123',
    });

    const findResult = await findTaskById.execute(task.id);

    expect(findResult).toHaveProperty('id');
    expect(findResult.user_id).toBe('123');
    expect(findResult.title).toBe('New Task');
    expect(findResult.status).toBe('open');
  });

  it('Should not be able to find a invalid task', async () => {
    await expect(findTaskById.execute('invalid')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
