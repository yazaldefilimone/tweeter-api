import { LoginUserUseCase, SigInUserUseCase } from '@/data/use-cases/user';
import { invalidParamError, notFoundError } from '@/domain/errors';
import { CompareHashMock, CreateHashMock } from '@/tests/infra/cryptography/mocks';
import { InMemoryUserRepository } from '@/tests/infra/repository/user';

const MakeSut = () => {
  const fakeUser: any = {
    email: 'any@gmail.com',
    password: '123456578',
    name: 'any name',
    username: '@anyUsername',
    born: '21/02/2024',
    bio: 'any biography',
  };

  const userRepository = new InMemoryUserRepository();
  const comparehash = new CompareHashMock();
  const createHash = new CreateHashMock();
  const SigInSut = new SigInUserUseCase(createHash, userRepository);
  const sut = new LoginUserUseCase(userRepository, comparehash);
  return {
    sut,
    comparehash,
    userRepository,
    fakeUser,
    SigInSut,
  };
};

describe('LoginUserUsecase', () => {
  it('should return user not Found if not receive correct email', async () => {
    const { sut, fakeUser } = MakeSut();
    const userOrError = await sut.preform(fakeUser);

    expect(userOrError.isLeft()).toBe(true);
    expect(userOrError.value).toEqual(new notFoundError('user'));
  });
  it('should return invalid password if not receive correct password', async () => {
    const { sut, fakeUser, SigInSut } = MakeSut();
    await SigInSut.preform(fakeUser);
    fakeUser.password = 'invalidPassword';
    const userOrError = await sut.preform(fakeUser);

    expect(userOrError.isLeft()).toBe(true);
    expect(userOrError.value).toEqual(new invalidParamError('password'));
  });

  it('should return user if  receive correct data', async () => {
    const { sut, fakeUser, SigInSut } = MakeSut();
    const user = await SigInSut.preform(fakeUser);
    const userOrError = await sut.preform(fakeUser);

    expect(userOrError.isRight()).toBe(true);
    expect(userOrError.value).toEqual(user.value);
    // expect(userOrError.value).toHaveProperty(fakeUser.email)
  });
});
