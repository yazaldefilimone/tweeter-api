import { User } from '../../../../src/domain/user/entity';
import { invalidParamError } from '../../../../src/domain/user/errors'


const makeSut = () => {

  const sut = new User()
  return {
    sut
  }
}

describe('User', () => {
  it('should return invalidParamsError if not receive correct emial', () => {
    const { sut } = makeSut();
    
    const user = {
      name:"any name",
      username:"@anyUsername",
      born:"21/02/2024",
      bio:"any biography",
      email:"invaid_email",
      password:"1234yaza"
    }

    const response = sut.build(user);

    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new invalidParamError('email'))
  })
})
