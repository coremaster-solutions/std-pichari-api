import { INotificationRepository } from "../../domain/repositories";

interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  personalId?: string;
}
export class GetAllNotificationService {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(queryData: IRequest): Promise<any> {
    const response = await this.notificationRepository.findAll(queryData);

    return {
      message: "Successful",
      code: "000000",
      data: response,
    };
  }
}
