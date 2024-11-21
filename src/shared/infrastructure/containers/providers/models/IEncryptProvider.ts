export interface IEncryptProvider {
  hash(plainTextString: string): Promise<string>;
  verify(plainTextString: string, hashedText: string): Promise<boolean>;
}
