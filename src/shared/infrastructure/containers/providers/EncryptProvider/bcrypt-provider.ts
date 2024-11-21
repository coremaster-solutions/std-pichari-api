import { IEncryptProvider } from "../models/IEncryptProvider";
import { hash, compare } from "bcrypt";
export class BCryptProvider implements IEncryptProvider {
  async hash(plainTextString: string): Promise<string> {
    return await hash(plainTextString, 10);
  }
  async verify(plainTextString: string, hashedText: string): Promise<boolean> {
    try {
      return await compare(plainTextString, hashedText);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
