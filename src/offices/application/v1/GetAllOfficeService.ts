import { StatusOfficeEnum } from "@/offices/domain/enum";
import { IOfficeRepository } from "../../domain/repositories";

interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  status?: StatusOfficeEnum;
}
export class GetAllOfficeService {
  constructor(private officeRepository: IOfficeRepository) {}

  async execute(queryData: IRequest): Promise<any> {
    const response = await this.officeRepository.findAll(queryData);

    return {
      message: "Successful",
      code: "000000",
      data: response,
    };
  }
}
