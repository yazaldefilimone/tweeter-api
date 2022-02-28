export class invalidParamError extends Error{
  constructor(param:string){
    super(`invalid param: [${param}].`);
    this.name = 'invalidParamError'
  }
}
