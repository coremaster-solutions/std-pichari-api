import { DocumentModel } from "@/documents/domain/models";
import { statusProcedureEs } from "@/documents/locale";
import { email_status_procedure } from "@/documents/templates/email";
import { Envs } from "@/shared/config";
import { IEmailProvider } from "@/shared/infrastructure/containers";
import { getDateFormatTimezone, getTimeFormatTimezone } from "@/shared/utils";
import { TrackingDocumentModel } from "@/tracking_documents/domain/models";
import path from "path";

export type ISendEmailStatusProcedureServiceRequest = {
  procedure: DocumentModel;
  tracking: TrackingDocumentModel;
};

export class SendEmailStatusProcedureService {
  constructor(private emailProvider: IEmailProvider) {}

  async execute({
    procedure,
    tracking,
  }: ISendEmailStatusProcedureServiceRequest) {
    const string_html = email_status_procedure({
      citizen_full_name: procedure.citizen?.fullName ?? "",
      procedure_number: tracking.procedureNumber ?? "",
      destiny_office: tracking.destinyOffice?.name ?? "",
      procedure_status: statusProcedureEs[tracking.statusProcedure],
      link: `${Envs.FRONT_URL}/result-procedure-details?procedureNumber=${procedure.procedureNumber}`,
      created_at_format: `${getDateFormatTimezone(
        new Date(tracking.createdAt ?? tracking.updatedAt).toJSON()
      )} ${getTimeFormatTimezone(
        new Date(tracking.createdAt ?? tracking.updatedAt).toJSON()
      )}`,
    });

    await this.emailProvider.sendEmail({
      to: procedure.citizen
        ? procedure.citizen.email
        : procedure.creator?.email ?? "",
      subject: `Estado de tu trámite N° ${procedure.procedureNumber}`,
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
