import { API_ERRORS, ERROR_CONSTANTS } from "../libs/Constants/ErrorConstants";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  constructor(errorKey: keyof typeof ERROR_CONSTANTS, message: string) {
    const errorData = API_ERRORS[errorKey];
    super(message);
    this.statusCode = errorData.statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
