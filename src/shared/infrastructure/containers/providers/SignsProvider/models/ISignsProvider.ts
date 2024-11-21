export interface ISignsProvider {
  getToken(): Promise<string>;
}
