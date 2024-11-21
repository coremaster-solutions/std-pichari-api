import { AppError } from "@/shared/domain/models";
import { ISignsProvider } from "@/shared/infrastructure/containers";
export class GenerateTokenSignsPeruService {
  constructor(private signsProvider: ISignsProvider) {}

  async execute(): Promise<string> {
    const token = await this.signsProvider.getToken();

    if (!token) {
      throw new AppError({
        message: "Error al generar el token",
      });
    }

    return token;
  }
}
