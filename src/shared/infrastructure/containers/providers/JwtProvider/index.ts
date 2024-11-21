import { Envs } from "@/shared/config";
import { IJwtProvider } from "../models/IJwtProvider";
import { sign as signJwt, verify as verifyJwt } from "jsonwebtoken";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";

const jwtSecret = Envs.JWT_SECRET ?? "";

export class JwtProvider implements IJwtProvider {
  sign(data: string | object | Buffer, duration: string = "1h"): string {
    return signJwt(data, jwtSecret, { expiresIn: duration });
  }
  verify<T extends Record<string, unknown>>(token: string): T | any {
    try {
      return (verifyJwt(token, jwtSecret) ?? null) as T;
    } catch (error) {
      throw new AppError({
        message: "Token Expired",
        statusCode: httpStatus.UNAUTHORIZED,
      });
    }
  }
}
