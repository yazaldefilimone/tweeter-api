import { HttpResponse } from '../protocols'
export interface Icontroller{
   perform: (input:Icontroller.Input) => Promise<Icontroller.Output>;
}



export namespace Icontroller{
   export type Input = {
      params:any,
      body:any
   }

   export type Output = HttpResponse;
}
