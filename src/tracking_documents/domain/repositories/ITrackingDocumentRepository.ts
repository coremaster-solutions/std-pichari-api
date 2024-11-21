import { StatusDocumentEnum } from "@/documents/domain/enum";
import { ICreateTrackingDto, IUpdateTrackingDto } from "../dtos";
import { TrackingDocumentModel } from "../models";
import { IDataWithPagination } from "@/shared/infrastructure/db";

export interface IFindAll {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusDocumentEnum;
  documentId?: string;
}

export interface ITrackingDocumentRepository {
  create(data: ICreateTrackingDto): Promise<TrackingDocumentModel>;
  update(id: string, data: IUpdateTrackingDto): Promise<TrackingDocumentModel>;
  findAll(
    params: IFindAll
  ): Promise<IDataWithPagination<TrackingDocumentModel[]>>;
  findById(id: string): Promise<TrackingDocumentModel | null>;
  deleteById(id: string): Promise<TrackingDocumentModel | null>;
  findAllTrackingDocumentsByDestinyPersonalId(
    destinyPersonalId: string
  ): Promise<TrackingDocumentModel[]>;
}
