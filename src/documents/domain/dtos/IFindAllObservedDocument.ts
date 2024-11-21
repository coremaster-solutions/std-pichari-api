import { StatusDocumentEnum } from "../enum";

export interface IFindAllObservedDocument {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusDocumentEnum;
  destinyPersonalId?: string;
  destinyOfficeId?: string;
  documentTypeId?: string;
}
