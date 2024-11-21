import { StatusDocumentEnum } from "../enum";

export interface IFindAllArchivedDocument {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusDocumentEnum;
  destinyOfficeId?: string;
  destinyPersonalId?: string;
}
