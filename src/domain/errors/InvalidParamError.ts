export class InvalidParamError extends Error {
  constructor(param: string) {
    super(`invalid param [${param}].`);
  }
}
