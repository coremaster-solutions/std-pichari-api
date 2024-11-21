import { DocumentModel } from "@/documents/domain/models";
import { statusProcedureEs } from "@/documents/locale";
import { Envs } from "@/shared/config";
import { IWhatsAppProvider } from "@/shared/infrastructure/containers";
import { getDateFormatTimezone, getTimeFormatTimezone } from "@/shared/utils";
import { TrackingDocumentModel } from "@/tracking_documents/domain/models";

export interface ISendWhatsAppStatusProcedureServiceRequest {
  procedure: DocumentModel;
  tracking: TrackingDocumentModel;
}

export class SendWhatsAppStatusProcedureService {
  constructor(private whatsAppProvider: IWhatsAppProvider) {}

  async execute(data: ISendWhatsAppStatusProcedureServiceRequest) {
    try {
      const {
        procedureNumber,
        message: messageDerivation,
        createdAt,
        updatedAt,
        destinyOffice,
        statusProcedure,
      } = data.tracking;

      const { fullName, phone } = data?.procedure?.citizen!;
      const messageString = messageDerivation
        ? "`\n - Mensaje: `" + messageDerivation.trim() + "`"
        : "`";
      const message =
        "Hola *" +
        fullName +
        "*\nTu documento con número de trámite *" +
        procedureNumber +
        "*, se encuentra en la *" +
        destinyOffice?.name +
        "*\n - Su estado es: `" +
        statusProcedureEs[statusProcedure] +
        "`\n - Fecha y hora: `" +
        `${getDateFormatTimezone(
          new Date(updatedAt! ?? createdAt).toJSON()
        )} ${getTimeFormatTimezone(
          new Date(updatedAt! ?? createdAt).toJSON()
        )}` +
        messageString;

      await this.whatsAppProvider.sendMessage(
        `${Envs.WHATSAPP_PREFIX_COUNTRY}${phone}`,
        message
      );
      console.log("Send WhatsApp status procedure message successful!");
    } catch (error) {
      console.log("SendWhatsAppStatusProcedureService ERROR:", error);
    }
  }
}
