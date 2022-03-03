
import { SigInUserUseCase } from '@/data/use-cases/user';
import { InMemoryUserRepository } from '@/tests/infra/repository/user';
import { CreateHashMock } from '../../../../tests/infra/cryptography/mocks';

const makeSut = () => {
  const userData = {
      name:"any name",
      username:"@anyUsername",
      born:"21/02/2024",
      bio:"any biography",
      email:"email@gmail.com",
      password:"1234yaza"
    }
  const createHashSpy:any = new CreateHashMock()
  const userRepositorySpy: any= new InMemoryUserRepository()
  const sut = new SigInUserUseCase(createHashSpy, userRepositorySpy)
  
  return {
    sut,
    userRepositorySpy,
    createHashSpy,
    userData
  }
}

describe('SigInUserUseCase', () => {
  it('Sould bee call userRepositorySpy.findByEmail if receive all correct params', async () => {
    const { sut, userData, userRepositorySpy } = makeSut();
    await sut.preform(userData);
    expect(userRepositorySpy.addCallCount).toBe(1);
  })
})
