export interface ICacheServices {
  set: (data: ICacheServices.InputSet) => ICacheServices.outputSet;
  get: (key: string) => ICacheServices.outPut;
  delete: (key: string) => ICacheServices.outPut;
}

export namespace ICacheServices {
  export type outputSet = Promise<string>;
  export type InputSet = {
    key: string;
    value: string;
    time?: number;
  };
  export type outPut = Promise<void>;
}
