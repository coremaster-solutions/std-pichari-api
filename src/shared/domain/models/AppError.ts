interface IAppErrorDTO {
  message: string;
  errorCode?: string;
  statusCode?: number;
  data?: any;
  internalError?: {
    type: string;
    data?: any;
  };
}

export class AppError {
  public readonly message: string;

  public readonly status_code: number;

  public readonly code: string;

  public readonly data: any;

  constructor({
    message,
    errorCode = "",
    statusCode = 400,
    data = [],
    internalError,
  }: IAppErrorDTO) {
    if (internalError) console.log({ internalError });
    this.code = errorCode;
    this.message = message;
    this.status_code = statusCode;
    this.data = data;
  }
}
