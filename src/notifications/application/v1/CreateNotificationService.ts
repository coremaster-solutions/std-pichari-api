import { NotificationModel } from "../../domain/models";
import { INotificationRepository } from "../../domain/repositories";
import { Prisma } from "@prisma/client";

interface IRequest extends Prisma.NotificationCreateInput {}

export class CreateNotificationService {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(data: IRequest): Promise<NotificationModel> {
    const response = await this.notificationRepository.create(data);

    return response;
  }
}
