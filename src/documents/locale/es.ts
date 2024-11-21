import { StatusDocumentEnum } from "../domain/enum";

export const statusProcedureEs: Record<StatusDocumentEnum, string> = {
  PENDING_RECEPTION: "Pendiente a recepción",
  ATTENDED_DERIVED: "Atendido y derivado",
  IN_PROGRESS: "En proceso",
  OBSERVED: "Observado",
  ARCHIVED: "Archivado y finalizado",
};
