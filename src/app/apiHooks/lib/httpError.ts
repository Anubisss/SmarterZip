export class HttpError extends Error {
  status: number;

  constructor(status: number, statusText: string) {
    super(`HTTP ${status} - ${statusText}`);
    this.status = status;
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
