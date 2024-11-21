import { DocumentModel } from "@/documents/domain/models";
import { email_create_procedure } from "@/documents/templates/email";
import { Envs } from "@/shared/config";
import { IEmailProvider } from "@/shared/infrastructure/containers";
import { getDateFormatTimezone, getTimeFormatTimezone } from "@/shared/utils";
import path from "path";

type IRequest = {
  data: DocumentModel;
};

export class SendEmailCreateProcedureService {
  constructor(private emailProvider: IEmailProvider) {}

  async execute({ data }: IRequest) {
    const string_html = email_create_procedure({
      citizen_full_name: data.citizen?.fullName ?? "",
      procedure_number: data.procedureNumber,
      link: `${Envs.FRONT_URL}/result-procedure-details?procedureNumber=${data.procedureNumber}`,
      created_at_format: `${getDateFormatTimezone(
        new Date(data.createdAt).toJSON()
      )} ${getTimeFormatTimezone(new Date(data.createdAt).toJSON())}`,
    });

    await this.emailProvider.sendEmail({
      to: data.citizen ? data.citizen.email : data.creator?.email ?? "",
      subject: "Registro del trámite",
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
