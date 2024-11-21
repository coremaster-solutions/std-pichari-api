import { AppError } from "@/shared/domain/models";
import { ISignsProvider } from "../models";
import { Envs } from "@/shared/config";
import axios from "axios";
import qs from "qs";

export class SignsProvider implements ISignsProvider {
  async getToken(): Promise<string> {
    try {
      let config = {
        method: "post",
        url: Envs.SIGN_PERU_TOKEN_URL,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: qs.stringify({
          client_id: Envs.SIGN_PERU_CLIENT_ID,
          client_secret: Envs.SIGN_PERU_CLIENT_SECRET,
        }),
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error: any) {
      console.log("SignsProvider:::", error);

      throw new AppError({
        message: error.message,
      });
    }
  }
}
