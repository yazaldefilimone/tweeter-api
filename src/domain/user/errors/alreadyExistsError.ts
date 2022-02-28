export class alreadyExistsError extends Error{
  constructor(){
    super(`user already exists.`);
    this.name = 'alreadyExistsError'
  }
}
