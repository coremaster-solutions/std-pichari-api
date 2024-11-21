import { ICreateSignLogDto, IUpdateSignLogDto } from "../../dtos";
import { SignLogModel } from "../models";

export interface ISignLogRepository {
  create(data: ICreateSignLogDto): Promise<SignLogModel>;
  update(id: string, data: IUpdateSignLogDto): Promise<SignLogModel>;
  findById(id: string): Promise<SignLogModel | null>;
}
