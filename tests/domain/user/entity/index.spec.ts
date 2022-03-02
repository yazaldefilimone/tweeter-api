import { User } from '../../../../src/domain/user/entity';
import { invalidParamError } from '../../../../src/domain/user/errors'


const makeSut = () => {
    const RequestUser = {
      name:"any name",
      username:"@anyUsername",
      born:"21/02/2024",
      bio:"any biography",
      email:"email@gmail.com",
      password:"1234yaza"
    }
  const sut = new User()
  return {
    sut,
    user:RequestUser
  }
}

describe('User', () => {
  it('should return invalidParamsError if receive incorrect emial', () => {
    const { sut, user } = makeSut()
    user.email = 'invalid_email'
    const response = sut.build(user);
    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new invalidParamError('email'))
  })
  
  it('should return invalidParamsError if not receive correct name', () => {
    const { sut, user } = makeSut()
    user.name = 'a';
    const response = sut.build(user);
    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new invalidParamError('name'))
  })
  
  it('should return invalidParamsError if receive incorrect username', () => {
    const { sut, user } = makeSut()
    user.username = 'invalid_username';
    const response = sut.build(user);
    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new invalidParamError('username'))
  })
  
  it('should return invalidParamsError if  receive incorrect bio', () => {
    const { sut, user } = makeSut()
    user.bio = '';
    const response = sut.build(user);
    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new invalidParamError('biography'))
  })
  
  it('should return invalidParamsError if receive incorrect born', () => {
    const { sut, user } = makeSut()
    user.born = '12/06';
    const response = sut.build(user);
    expect(response.isLeft()).toBe(true)
    expect(response.value).toEqual(new invalidParamError('born data'))
  })  
})

