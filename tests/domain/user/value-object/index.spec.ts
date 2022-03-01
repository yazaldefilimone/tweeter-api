import { UserObjectValue } from '../../../../src/domain/user/object-value';
import { invalidParamError } from '../../../../src/domain/user/errors';

const makeSut = () => {
  const sut = new UserObjectValue()
  return { sut }
}

describe('UserObjectValue', () => {
  it('Should return false if email invalid', async () => {
    const { sut } = makeSut();
    const email = 'deo@gmail';

    const response =  sut.Email(email);


    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new invalidParamError('email'))
  })
})
