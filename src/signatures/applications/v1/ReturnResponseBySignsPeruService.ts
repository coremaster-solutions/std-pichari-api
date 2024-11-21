import { AppError } from "@/shared/domain/models";
import { ISignsProvider } from "@/shared/infrastructure/containers";
import { ISignLogRepository } from "../../domain/repositories";
import { PAdESDataResponse } from "@/signatures/domain/models";

interface IRequest {
  id: string;
}

export class ReturnResponseBySignsPeruService {
  constructor(
    private signsProvider: ISignsProvider,
    private signLogRepository: ISignLogRepository
  ) {}

  async execute({ id }: IRequest): Promise<any> {
    const token = await this.signsProvider.getToken();

    if (!token) {
      throw new AppError({
        message: "Error al generar el token",
      });
    }
    const signLog = await this.signLogRepository.findById(id);

    if (!signLog) {
      throw new AppError({
        message: "El log del firmado no existe",
      });
    }

    const { dataResponse, ...signLogDb } = signLog;

    return btoa(
      JSON.stringify(
        Object.assign(dataResponse as PAdESDataResponse | any, { token })
      )
    );
    // return Object.assign(dataResponse as PAdESDataResponse | any, { token });
  }
}
