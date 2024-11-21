export interface IJwtProvider {
  sign(data: string | object | Buffer, duration?: string): string;
  verify<T extends Record<string, any>>(token: string): T | any;
}
