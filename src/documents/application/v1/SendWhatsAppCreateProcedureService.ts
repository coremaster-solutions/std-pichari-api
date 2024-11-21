import { DocumentModel } from "@/documents/domain/models";
import { Envs } from "@/shared/config";
import { IWhatsAppProvider } from "@/shared/infrastructure/containers";
import { getDateFormatTimezone, getTimeFormatTimezone } from "@/shared/utils";

interface IRequest {
  procedure: DocumentModel;
}

export class SendWhatsAppCreateProcedureService {
  constructor(private whatsAppProvider: IWhatsAppProvider) {}

  async execute(data: IRequest) {
    try {
      const { procedureNumber, createdAt } = data.procedure;
      const { fullName, phone } = data?.procedure?.citizen!;
      const message =
        "Hola *" +
        fullName +
        "*\n¡Agradecemos tu interacción con nuestro sistema!\nEl número de trámite asignado a tu solicitud es un identificador único que te permitirá dar seguimiento al progreso de tu trámite. Te recomendamos que conserves este número para futuras consultas o actualizaciones sobre tu solicitud.\n - El número de trámite: `" +
        procedureNumber +
        "`\n - Fecha y hora de registro: `" +
        `${getDateFormatTimezone(
          new Date(createdAt).toJSON()
        )} ${getTimeFormatTimezone(new Date(createdAt).toJSON())}` +
        "`\n\nPara ver el estado de tu trámite puedes visitar este enlace:\n " +
        Envs.FRONT_URL +
        "/result-procedure-details?procedureNumber=" +
        procedureNumber;
      await this.whatsAppProvider.sendMessage(
        `${Envs.WHATSAPP_PREFIX_COUNTRY}${phone}`,
        message
      );
      console.log("Send WhatsApp create procedure message successful!");
    } catch (error) {
      console.log("SendWhatsAppCreateProcedureService ERROR:", error);
    }
  }
}
