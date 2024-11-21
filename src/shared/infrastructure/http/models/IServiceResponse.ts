export interface IServiceResponse<T> {
  message: string;
  code: string;
  data: T;
}
