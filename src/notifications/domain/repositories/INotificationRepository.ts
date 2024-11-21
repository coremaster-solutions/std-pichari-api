import { IDataWithPagination } from "@/shared/infrastructure/db";
import { ICreateNotificationDto, IUpdateNotificationDto } from "../dtos";
import { DeleteManyResponse, NotificationModel } from "../models";
export interface IFindAllNotification {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  personalId?: string;
  officeId?: string;
  readAt?: string;
}

export interface INotificationRepository {
  create(data: ICreateNotificationDto): Promise<NotificationModel>;
  update(id: string, data: IUpdateNotificationDto): Promise<NotificationModel>;
  findAll(
    params: IFindAllNotification
  ): Promise<IDataWithPagination<NotificationModel[]>>;
  findById(id: string): Promise<NotificationModel | null>;
  findManyByProcedureNumber(
    procedureNumber: string
  ): Promise<NotificationModel[] | null>;
  deleteById(id: string): Promise<NotificationModel>;
  deleteManyByProcedureNumber(
    procedureNumber: string
  ): Promise<DeleteManyResponse>;
}
