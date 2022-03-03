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

  it('Should CompareHash.compare return boolean', async () => {
    const { sut } = makeSut();
    const response =  await sut.compare({ password:'', passwordhash:'' });
    expect(response).toBe(false)
  })
})
