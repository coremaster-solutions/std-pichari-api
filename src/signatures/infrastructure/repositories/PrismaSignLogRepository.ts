import {
  messageMapPrisma,
  MessageMapTypePrisma,
  TPrismaService,
} from "@/shared/infrastructure/db";
import { SignLogModel } from "../../domain/models";
import { ISignLogRepository } from "../../domain/repositories";
import { ICreateSignLogDto, IUpdateSignLogDto } from "../../dtos";
import { AppError } from "@/shared/domain/models";

export class PrismaSignLogRepository implements ISignLogRepository {
  constructor(private db: TPrismaService) {}

  async create(data: ICreateSignLogDto): Promise<SignLogModel> {
    try {
      return await this.db.signLog.create({
        data,
      });
    } catch (error: any) {
      console.log("ERROR SIGN LOG create::", error.message);
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma](
          "El log del firmado"
        );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async update(id: string, data: IUpdateSignLogDto): Promise<SignLogModel> {
    try {
      return await this.db.signLog.update({
        where: { id },
        data,
      });
    } catch (error: any) {
      console.log("ERROR SIGN LOG update::", error.message);
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma](
          "El log del firmado"
        );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }

  async findById(id: string): Promise<SignLogModel | null> {
    try {
      return await this.db.signLog.findFirst({
        where: { id },
      });
    } catch (error: any) {
      console.log("ERROR SIGN LOG findById::", error.message);
      const message =
        messageMapPrisma[error.code as MessageMapTypePrisma](
          "El log del firmado"
        );
      throw new AppError({
        message: message,
        errorCode: "Error",
      });
    }
  }
}
