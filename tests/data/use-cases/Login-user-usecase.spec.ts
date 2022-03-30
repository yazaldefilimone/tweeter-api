import { LoginUserUseCase } from "@/data/use-cases/user"
import { invalidParamError, notFoundError } from "@/domain/user/errors";
import { CompareHashMock } from "@/tests/infra/cryptography/mocks"
import { InMemoryUserRepository } from "@/tests/infra/repository/user";


const MakeSut = () => {
  const fakeUser = {
    email:"any@gmail.com",
    password:'123456578'
  }
  const comparehash = new CompareHashMock();
  const userRepository = new InMemoryUserRepository()
  const sut = new LoginUserUseCase(userRepository, comparehash);
  return {
    sut,
    comparehash,
    userRepository,
    fakeUser
  }
}

describe('LoginUserUsecase', () => {
  it('should return user not Found if not receive correct email', async () => {
    const { sut, fakeUser } = MakeSut();
    const userOrError = await sut.preform(fakeUser);

    expect(userOrError.isLeft()).toBe(true);
    expect(userOrError.value).toEqual(new notFoundError("user"))
  })
  
})