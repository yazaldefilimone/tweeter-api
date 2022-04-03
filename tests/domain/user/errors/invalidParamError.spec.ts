import { invalidParamError } from '@/domain/errors';

describe('invalidParamError', () => {
  it('Should return message of error', () => {
    const sut = new invalidParamError('error');
    expect(sut.message).toEqual('invalid param: [error].');
    expect(sut.name).toEqual('invalidParamError');
  });
});
