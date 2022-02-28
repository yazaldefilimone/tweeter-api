
export interface IcreateHash{
  create: (data:IcreateHash.Input) => Promise<IcreateHash.Output>
}



export namespace IcreateHash{
  export type Input = {
    password:string
  }

  export type Output = string;

}
