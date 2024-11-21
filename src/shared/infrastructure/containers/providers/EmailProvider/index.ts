import { Envs } from "@/shared/config";
import nodemailer from "nodemailer";

export type EmailTemplateName = "create_procedure_email" | "status_procedure";

type Params = {
  to: string;
  subject: string;
  template_html_string: string;
  attachments: Array<Record<string, any>>;
};

export interface IEmailProvider {
  sendEmail(params: Params): Promise<void>;
}

export class EmailProvider implements IEmailProvider {
  async sendEmail({
    to,
    subject,
    template_html_string,
    attachments,
  }: Params): Promise<void> {
    let transporter = nodemailer.createTransport({
      host: Envs.MAIL_HOST,
      port: Number(Envs.MAIL_PORT),
      secure: Envs.MAIL_ENCRYPTION === "true" ? true : false, // true for 465, false for other ports
      auth: {
        user: Envs.MAIL_USERNAME, // generated ethereal user
        pass: Envs.MAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: Envs.MAIL_FROM_ADDRESS, // sender address
      to, // list of receivers
      subject, // Subject line
      // text: "Hello world?", // plain text body
      html: template_html_string, // html body
      attachments,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
}
