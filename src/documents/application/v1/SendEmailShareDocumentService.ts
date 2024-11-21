import { DocumentModel } from "@/documents/domain/models";
import { email_share_document } from "@/documents/templates/email";
import { Envs } from "@/shared/config";
import { IEmailProvider } from "@/shared/infrastructure/containers";
import { getDateFormatTimezone, getTimeFormatTimezone } from "@/shared/utils";
import path from "path";

export interface ISendEmailShareDocumentService {
  procedure: DocumentModel;
  subject: string;
  email: string;
  message: string;
}

export class SendEmailShareDocumentService {
  constructor(private emailProvider: IEmailProvider) {}

  async execute({
    procedure,
    subject,
    email,
    message,
  }: ISendEmailShareDocumentService) {
    const date = new Date();
    const string_html = email_share_document({
      message,
      created_at_format: `${getDateFormatTimezone(
        new Date(date).toJSON()
      )} ${getTimeFormatTimezone(new Date(date).toJSON())}`,
    });
    console.log("SendEmailShareDocumentService", {
      date,
      to: email,
      subject,
      procedure: procedure.documentUrl,
      message,
      attachments: {
        filename: procedure.documentUrl.split("/").pop(),
        path: `${Envs.API_URL}/${procedure.documentUrl}`,
      },
    });

    await this.emailProvider.sendEmail({
      to: email,
      subject,
      template_html_string: string_html,
      attachments: [
        {
          filename: "image.png",
          path: path.resolve("public/assets/logo_pichari.png"),
          cid: "logo_merchant",
        },
        {
          filename: procedure.documentUrl.split("/").pop(),
          path: `${Envs.API_URL}/${procedure.documentUrl}`,
        },
      ],
    });
  }
}
