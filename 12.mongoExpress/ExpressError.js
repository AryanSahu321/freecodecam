// Custom Error Class for Express
export class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.status = status;
    this.message = message;
  }
}
