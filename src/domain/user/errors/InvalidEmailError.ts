export class InvalidEmailError extends Error {
  constructor(email: string) {
    super(`This email: [${email}] is invalid`);
  }
}
