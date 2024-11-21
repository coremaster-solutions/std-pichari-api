import { StatusDocumentEnum } from "../enum";

export interface IFindAllPendingAndDerivedDocument {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusDocumentEnum | string;
  destinyOfficeId?: string | null;
  destinyPersonalId?: string;
  documentTypeId?: string;
}
