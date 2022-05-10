export class InvalidNameError extends Error {
  constructor(name: string) {
    super(`This name: [${name}] is invalid`);
  }
}
