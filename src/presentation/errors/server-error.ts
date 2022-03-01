export class ServerError extends Error {
  constructor () {
    super('Internal server error try again.')
    this.name = 'ServerError'
  }
}
