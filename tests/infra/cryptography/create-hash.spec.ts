import { CreateHash } from '../../../src/infra/cryptography';

const makeSut = () => {
  const sut = new CreateHash();

  return { sut }
}

describe('CreateHash', () => {
  it('Should CreateHash have dependece of bcrypt', async () => {
    const { sut } = makeSut();
    expect(sut.encrypt).toBeDefined();
    expect(sut.encrypt).toHaveProperty('hash');
  })

  it('Should CreateHash.create return of hash if sucessfully method', async () => {
    const { sut } = makeSut();
    const response = await sut.create({ password: 'any_password' });
    expect(response).toBeDefined();
    expect(typeof response).toBe("string")
    expect(response.length).toBe(60)
  })
})
