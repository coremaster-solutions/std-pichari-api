import { Prisma } from "@prisma/client";

export interface IUpdateNotificationDto
  extends Prisma.NotificationUpdateInput {}
