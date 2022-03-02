import { alreadyExistsError } from '@/domain/user/errors'


describe('alreadyExistsError', () => {
  it('Should return a message of user already exists', () => {
    const sut = new alreadyExistsError();
    expect(sut.message).toBe('user already exists.')
    expect(sut.name).toBe('alreadyExistsError')
  })
})
