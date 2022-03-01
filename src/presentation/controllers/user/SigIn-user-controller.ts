import { Icontroller } from '@/presentation/protocols';
import { IsigInUserUseCase } from '@/domain/user/use-cases';
import { ok, serverError, badRequest } from '@/presentation/helpers';


export class SigInUserController implements Icontroller{
  constructor(private readonly sigInUserUseCase:IsigInUserUseCase){}

  async perform(input: Icontroller.Input): Promise<Icontroller.Output>{
    try{
      const result = await this.sigInUserUseCase.preform(input.body);

      if(result.isLeft()){
        return badRequest(result.value)
      }
      
      return ok(result.value);

    } catch(error){
      return serverError(error)
    }
  }
}
