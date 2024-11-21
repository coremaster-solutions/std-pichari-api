import { DocumentModel } from "@/documents/domain/models";
import { Notification } from "@prisma/client";

export interface NotificationModel extends Notification {
  document?: DocumentModel | null;
}

export interface DeleteManyResponse {
  count: number;
}
