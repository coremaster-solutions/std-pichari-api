import { prismaService } from "@/shared/infrastructure/db";
import { NotificationsController } from "@/shared/infrastructure/http/controllers";
import {
  CreateNotificationService,
  GetAllNotificationService,
  UpdateNotificationService,
} from "../application/v1";
import { NotificationPrismaRepository } from "../infrastructure/prisma/NotificationPrismaRepository";

export const prismaNotificationRepository = new NotificationPrismaRepository(
  prismaService
);

const updateNotificationService = new UpdateNotificationService(
  prismaNotificationRepository
);
const getAllNotificationService = new GetAllNotificationService(
  prismaNotificationRepository
);
export const createNotificationService = new CreateNotificationService(
  prismaNotificationRepository
);

export const notificationsController = new NotificationsController(
  getAllNotificationService,
  updateNotificationService
);
