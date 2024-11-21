import { DocumentModel } from "@/documents/domain/models";
import { statusProcedureEs } from "@/documents/locale";
import { getFullName } from "@/personals/utils";
import { Envs } from "@/shared/config";
import { IWhatsAppProvider } from "@/shared/infrastructure/containers";
import { getDateFormatTimezone, getTimeFormatTimezone } from "@/shared/utils";
import { TrackingDocumentModel } from "@/tracking_documents/domain/models";

export interface ISendWhatsAppStatusProcedureToPersonalService {
  procedure: DocumentModel;
  tracking: TrackingDocumentModel;
}

export class SendWhatsAppStatusProcedureToPersonalService {
  constructor(private whatsAppProvider: IWhatsAppProvider) {}

  async execute(data: ISendWhatsAppStatusProcedureToPersonalService) {
    try {
      const {
        procedureNumber,
        message: messageDerivation,
        createdAt,
        updatedAt,
        destinyOffice,
        statusProcedure,
      } = data.tracking;

      const { cellphone } = data?.procedure?.creator!;
      const fullName = getFullName(data?.procedure?.creator!);
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
        `${Envs.WHATSAPP_PREFIX_COUNTRY}${cellphone}`,
        message
      );
      console.log("Send WhatsApp status procedure message successful!");
    } catch (error) {
      console.log("SendWhatsAppStatusProcedureService ERROR:", error);
    }
  }
}
