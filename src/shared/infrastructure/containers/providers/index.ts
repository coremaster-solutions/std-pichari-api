import { EmailProvider } from "./EmailProvider";
import { JobsProvider } from "./JobsProvider";
import { JwtProvider } from "./JwtProvider";
import { RedisProvider } from "./RedisProvider";
import { WhatsAppApiMerchantProvider } from "./WhatsAppProvider";
import { WordToPDFProvider } from "./WordToPDFProvider";

export * from "./EmailProvider";
export * from "./EncryptProvider";
export * from "./GenerateRandomNumberProvider";
export * from "./UploadFileProvider";
export * from "./models";
export * from "./WhatsAppProvider";
export * from "./SignsProvider";
export * from "./RedisProvider";
export * from "./WordToPDFProvider";

export const jwtProvider = new JwtProvider();
export const emailProvider = new EmailProvider();
export const jobsProvider = new JobsProvider();
export const whatsAppProvider = new WhatsAppApiMerchantProvider();
export const redisProvider = new RedisProvider();
export const wordToPDFProvider = new WordToPDFProvider();
