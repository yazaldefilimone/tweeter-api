import { UserObjectValue } from '../../../../src/domain/user/object-value';
import { invalidParamError } from '../../../../src/domain/user/errors';

const makeSut = () => {
  const sut = new UserObjectValue()
  return { sut }
}

describe('UserObjectValue', () => {
  it('Should return invalidParamError if email invalid', async () => {
    const { sut } = makeSut();
    const invalidEmail = 'deo@gmail';
    const response =  sut.Email(invalidEmail);
    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new invalidParamError('email'))
  })
  
  it('Should return email if email is valid', async () => {
    const { sut } = makeSut();
    const ValidEmail = 'deo@gmail.com';
    const response =  sut.Email(ValidEmail);
    expect(response.isRight()).toBe(true)
    expect(response.value).toBe(ValidEmail)
  })
})
