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


})
