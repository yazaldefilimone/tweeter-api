export class InvalidBioError extends Error {
  constructor(bio: string) {
    super(`This bio: [${bio}] is invalid`);
  }
}
