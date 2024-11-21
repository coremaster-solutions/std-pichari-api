import { BCryptProvider } from "./bcrypt-provider";

export const encryptProvider = {
  bcrypt: new BCryptProvider(),
};
