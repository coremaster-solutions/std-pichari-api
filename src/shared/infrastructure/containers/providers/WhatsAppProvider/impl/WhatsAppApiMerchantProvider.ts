import { Envs } from "@/shared/config";
import axios from "axios";
import { IWhatsAppProvider } from "../models";

export class WhatsAppApiMerchantProvider implements IWhatsAppProvider {
  async sendMessage(phone: string, message: string): Promise<void> {
    try {
      await axios.post(
        Envs.WHATSAPP_API_MERCHANT_URL + "/v1/messages",
        {
          number: phone,
          message,
        },
        {
          timeout: 5000,
        }
      );
      console.log("Send Message successful to: " + phone);
    } catch (error) {
      console.log("WhatsAppApiMerchantProvider sendMessage", error);
    }
  }
}
