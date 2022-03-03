
import { SigInUserUseCase } from '@/data/use-cases/user';
import { InMemoryUserRepository } from '@/tests/infra/repository/user';
import { CreateHashMock } from '@/tests/infra/cryptography/mocks';

const makeSut = () => {
  const userData = {
      name:"any name",
      username:"@anyUsername",
      born:"21/02/2024",
      bio:"any biography",
      email:"email@gmail.com",
      password:"1234yaza"
    }
  const createHashMock:any = new CreateHashMock()
  const userRepository: any= new InMemoryUserRepository()
  const sut = new SigInUserUseCase(createHashMock, userRepository)
  
  return {
    sut,
    userRepository,
    createHashMock,
    userData
  }
}

describe('SigInUserUseCase', () => {
  it('Sould bee call userRepositoryMock.findByEmail if receive all correct params', async () => {
    const { sut, userData, userRepository } = makeSut();
    await sut.preform(userData);
    expect(userRepository.addCallCount).toBe(1);
  })
  
  it('Sould bee call createHashMock.create if receive all correct params', async () => {
    const { sut, userData, createHashMock } = makeSut();
    await sut.preform(userData);
    expect(createHashMock.count).toBe(1);
  })
})
