import { NotificationModel } from "../../domain/models";
import { INotificationRepository } from "../../domain/repositories";
import { Prisma } from "@prisma/client";

interface IRequest extends Prisma.NotificationUpdateInput {
  id: string;
}

export class UpdateNotificationService {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute({ id, ...data }: IRequest): Promise<NotificationModel> {
    const response = await this.notificationRepository.update(id, data);

    return response;
  }
}
