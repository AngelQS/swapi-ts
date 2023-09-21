export default class ServiceException extends Error {
  statusCode: number;
  code: string;
  error: string;
  constructor(statusCode: number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.error = message;
    Error.captureStackTrace(this, ServiceException);
  }
}