import { config } from "dotenv";
import z from "zod";
config();

const {
  JWT_SECRET,
  API_URL,
  SESSION_SECRET,
  REDIS_PORT,
  REDIS_HOST,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_FROM_ADDRESS,
  MAIL_ENCRYPTION,
  FRONT_URL,
  WHATSAPP_PREFIX_COUNTRY,
  WHATSAPP_API_MERCHANT_URL,
  SIGN_PERU_TOKEN_URL,
  SIGN_PERU_CLIENT_ID,
  SIGN_PERU_CLIENT_SECRET,
  STAMP_URL,
} = process.env;

const envSchema = z.object({
  JWT_SECRET: z.string().trim().min(1),
  API_URL: z.string().trim().min(1).url(),
  SESSION_SECRET: z.string().trim().min(1),
  REDIS_PORT: z.string().trim().min(1),
  REDIS_HOST: z.string().trim().min(1),
  MAIL_HOST: z.string().trim().min(1),
  MAIL_PORT: z.string().trim().min(1),
  MAIL_USERNAME: z.string().trim().min(1).email(),
  MAIL_PASSWORD: z.string().trim().min(1),
  MAIL_FROM_ADDRESS: z.string().trim().min(1).email(),
  MAIL_ENCRYPTION: z.string().trim().min(1),
  FRONT_URL: z.string().trim().min(1).url(),
  WHATSAPP_PREFIX_COUNTRY: z.string().trim().min(2),
  WHATSAPP_API_MERCHANT_URL: z.string().trim().min(1).url(),
  SIGN_PERU_TOKEN_URL: z.string().trim().min(1).url(),
  SIGN_PERU_CLIENT_ID: z.string().trim().min(1),
  SIGN_PERU_CLIENT_SECRET: z.string().trim().min(1),
  STAMP_URL: z.string().trim().min(1).url(),
});

const envServer = envSchema.safeParse({
  JWT_SECRET,
  API_URL,
  SESSION_SECRET,
  REDIS_PORT,
  REDIS_HOST,
  MAIL_HOST,
  MAIL_PORT,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_FROM_ADDRESS,
  MAIL_ENCRYPTION,
  FRONT_URL,
  WHATSAPP_PREFIX_COUNTRY,
  WHATSAPP_API_MERCHANT_URL,
  SIGN_PERU_TOKEN_URL,
  SIGN_PERU_CLIENT_ID,
  SIGN_PERU_CLIENT_SECRET,
  STAMP_URL,
});

if (!envServer.success) {
  console.error(envServer.error.issues);
  throw new Error("There is an error with the server environment variables");
  process.exit(1);
}

export const Envs = envServer.data;
