import { ICreatePersonalOfficeDto, IUpdatePersonalOfficeDto } from "../dtos";
import { PersonalOfficeModel } from "../models";

export interface IPersonalOfficesRepository {
  create(data: ICreatePersonalOfficeDto): Promise<PersonalOfficeModel>;
  update(
    id: string,
    data: IUpdatePersonalOfficeDto
  ): Promise<PersonalOfficeModel>;
  updatePersonalOfficeById(
    id: string,
    data: IUpdatePersonalOfficeDto
  ): Promise<Array<string>>;
  findById(id: string): Promise<PersonalOfficeModel | null>;
  deleteById(id: string): Promise<PersonalOfficeModel>;
}
