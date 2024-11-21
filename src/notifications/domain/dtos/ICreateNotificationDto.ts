import { Prisma } from "@prisma/client";

export interface ICreateNotificationDto
  extends Prisma.NotificationCreateInput {}
