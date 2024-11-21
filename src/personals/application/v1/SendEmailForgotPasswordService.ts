import { PersonalModel } from "@/personals/domain/models";
import { email_forgot_password } from "@/personals/templates/email";
import { getFullName } from "@/personals/utils";
import { Envs } from "@/shared/config";
import { IEmailProvider } from "@/shared/infrastructure/containers";
import path from "path";

export type ISendEmailForgotPasswordServiceRequest = {
  personal: PersonalModel;
  token: string;
};

export class SendEmailForgotPasswordService {
  constructor(private emailProvider: IEmailProvider) {}

  async execute({ personal, token }: ISendEmailForgotPasswordServiceRequest) {
    const string_html = email_forgot_password({
      full_name: getFullName(personal),
      link: `${Envs.FRONT_URL}/reset-password?token=${token}`,
    });

    await this.emailProvider.sendEmail({
      to: personal.email,
      subject: "Recuperar contraseña",
      template_html_string: string_html,
      attachments: [
        {
          filename: "image.png",
          path: path.resolve("public/assets/logo_pichari.png"),
          cid: "logo_merchant",
        },
      ],
    });
  }
}
