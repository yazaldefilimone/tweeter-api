import { UserObjectValue } from '../../../../src/domain/user/object-value';
import { invalidParamError } from '../../errors';

const makeSut = () => {
  const sut = new UserObjectValue();
  return { sut };
};

describe('UserObjectValue', () => {
  it('Should return invalidParamError if email invalid', async () => {
    const { sut } = makeSut();
    const invalidEmail = 'deo@gmail';
    const response = sut.Email(invalidEmail);
    expect(response.isLeft()).toBe(true);
    expect(response.value).toEqual(new invalidParamError('email'));
  });

  it('Should return email if email is valid', async () => {
    const { sut } = makeSut();
    const ValidEmail = 'deo@gmail.com';
    const response = sut.Email(ValidEmail);
    expect(response.isRight()).toBe(true);
    expect(response.value).toBe(ValidEmail);
  });

  it('Should return invalidParamError if name is invalid', async () => {
    const { sut } = makeSut();
    const invalidName = 'e';
    const response = sut.Name(invalidName);
    expect(response.isLeft()).toBe(true);
    expect(response.value).toEqual(new invalidParamError('name'));
  });

  it('Should return name if name is valid', async () => {
    const { sut } = makeSut();
    const ValidName = 'doe jon';
    const response = sut.Name(ValidName);
    expect(response.isRight()).toBe(true);
    expect(response.value).toBe(ValidName);
  });

  it('Should return invalidParamError if bio is invalid', async () => {
    const { sut } = makeSut();
    const invalidBio: any = null;
    const response = sut.Bio(invalidBio as string);
    expect(response.isLeft()).toBe(true);
    expect(response.value).toEqual(new invalidParamError('biography'));
  });

  it('Should return bio if bio is valid', async () => {
    const { sut } = makeSut();
    const ValidBio = 'I am fullStack developer';
    const response = sut.Bio(ValidBio);
    expect(response.isRight()).toBe(true);
    expect(response.value).toBe(ValidBio);
  });
});
