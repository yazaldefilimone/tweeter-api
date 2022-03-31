import { HttpResponse } from "../protocols";
export interface Icontroller {
  execute: (input: Icontroller.Input) => Icontroller.Output;
}

export namespace Icontroller {
  export type Input = {
    params: any;
    body: any;
  };

  export type Output = Promise<HttpResponse>;
}
