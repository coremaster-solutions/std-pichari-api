import { DocumentTypeIdEnum } from "@/personals/domain/enum";
import { IDataWithPagination } from "@/shared/infrastructure/db";
import {
  ICreateCitizenDto,
  ICreateDocumentDto,
  IFindAllArchivedDocument,
  IFindAllInProgressDocument,
  IFindAllObservedDocument,
  IFindAllPendingAndDerivedDocument,
    IFindByDocumentNumber,
  IFindOneWithCitizen,
  IUpdateCitizenDto,
  IUpdateDocumentDto,
} from "../dtos";
import { StatusDocumentEnum } from "../enum";
import { CitizenModel, DocumentModel } from "../models";
export interface IFindAllDocument {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusDocumentEnum | string;
  creatorId?: string;
  destinyOfficeId?: string | null;
  destinyPersonalId?: string;
  documentTypeId?: string;
  citizenDocumentNumber?: string;
  trackingNumberCorrelative?: string;
  startOfMonth?: string;
  endOfMonth?: string;
}

export interface IDocumentRepository {
  create(data: ICreateDocumentDto): Promise<DocumentModel>;
  createCitizen(data: ICreateCitizenDto): Promise<CitizenModel>;
  update(id: string, data: IUpdateDocumentDto): Promise<DocumentModel>;
  updateCitizen(id: string, data: IUpdateCitizenDto): Promise<CitizenModel>;
  findAll(
    params: IFindAllDocument
  ): Promise<IDataWithPagination<DocumentModel[]>>;
  findAllPendingAndDerived(
    params: IFindAllPendingAndDerivedDocument
  ): Promise<IDataWithPagination<DocumentModel[]>>;
  findAllInProgress(
    params: IFindAllInProgressDocument
  ): Promise<IDataWithPagination<DocumentModel[]>>;
  findAllObserved(
    params: IFindAllObservedDocument
  ): Promise<IDataWithPagination<DocumentModel[]>>;
  findAllArchived(
    params: IFindAllArchivedDocument
  ): Promise<IDataWithPagination<DocumentModel[]>>;
  findById(id: string): Promise<DocumentModel | null>;
  deleteById(id: string): Promise<DocumentModel>;
  findByDocumentNumber(params: IFindByDocumentNumber): Promise<DocumentModel | null>;
  findByOneCitizen(
    documentType: DocumentTypeIdEnum,
    documentNumber: string
  ): Promise<CitizenModel | null>;
  findByOneWithTrackings(
    params: IFindOneWithCitizen
  ): Promise<DocumentModel | null>;
  findAllByDocumentNumberAndCorrelative(
    params: IFindAllDocument
  ): Promise<DocumentModel[] | undefined>;
  countDocumentsCurrentMonthByDestinyOffice({
    destinyOfficeId,
  }: IFindAllDocument): Promise<any>;

  countDocumentsMonthByDestinyOfficeAndStatus(
    queryData: IFindAllDocument
  ): Promise<any>;

  findAllDocumentsByCreatorId(creatorId: string): Promise<DocumentModel[]>;
}
