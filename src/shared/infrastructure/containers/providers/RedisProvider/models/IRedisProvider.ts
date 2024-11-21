export type ParamsData = {
  key: string;
  value: string;
  seconds?: number;
};
export interface IRedisProvider {
  setData(params: ParamsData): void;
  getData(key: string): Promise<string | null>;
  delete(key: string): Promise<number>;
  connect(): void;
}
