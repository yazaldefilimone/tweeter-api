export class notFoundError extends Error{
  constructor(param:string){
    super(`not Found [${param}].`);
    this.name = 'notFoundError'
  }
}
