import { CompareHash } from '@/infra/cryptography';
import bcrypt from 'bcryptjs'

const makeSut = () => {
  const sut = new CompareHash();
  return { sut }
}

describe('CompareHash', () => {
  it('Should CompareHash have dependece of bcrypt', async () => {
    const { sut } = makeSut();

    expect(sut.encrypt).toEqual(bcrypt);
    expect(sut.encrypt).toHaveProperty('compare')
  })
})
