export default class noTokenError extends Error {
  constructor(message: string) {
    super(message);
  }
}
