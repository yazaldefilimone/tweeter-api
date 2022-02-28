
export interface IcreateHash{
  create: (data:IcreateHash.Input) => Promise<IcreateHash.OutPut>
}



namespace IcreateHash{
  export type Input = {
    password:string
  }

  export type OutPut = string;

}
