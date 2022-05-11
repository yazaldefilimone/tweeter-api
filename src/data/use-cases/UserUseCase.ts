import { userParam } from '@/domain/user/dtos';
import { IUserUseCase } from '@/domain/user/use-cases';

export class UserUseCase implements IUserUseCase {
  async signup(data: IUserUseCase.signOutput): IUserUseCase.signOutput {}
  async login(data: userParam): IUserUseCase.loginOutput {}
}
