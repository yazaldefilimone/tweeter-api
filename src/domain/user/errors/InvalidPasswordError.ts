export class InvalidPasswordError extends Error {
  constructor(password: string) {
    super(`This password: [${password}] is invalid`);
  }
}
