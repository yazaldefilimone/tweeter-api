
export interface IcompareHash{
  compare: (data:IcompareHash.Input) =>Promise<IcompareHash.Output>
}


export namespace IcompareHash{
  export type Input = {
    password:string;
    passwordhash:string
  }

  export type Output = boolean;
}
