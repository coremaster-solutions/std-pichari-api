import { IArchivistRepository } from "../../domain/repositories";
import { ArchivistTypeEnum } from "../../domain/enum";
interface IRequest {
  page?: number;
  perPage?: number;
  term?: string;
  dateFrom?: string;
  dateTo?: string;
  entityId?: string;
  entityType?: ArchivistTypeEnum;
  me?: string;
}
export class GetAllArchivistService {
  constructor(private archivistRepository: IArchivistRepository) {}

  async execute({ entityId, me, ...queryData }: IRequest): Promise<any> {
    const response = await this.archivistRepository.findAll({
      ...queryData,
      ...(me && entityId ? { entityId: `${entityId},${me}` } : { entityId }),
    });

    return {
      message: "Successful",
      code: "000000",
      data: response,
    };
  }
}
