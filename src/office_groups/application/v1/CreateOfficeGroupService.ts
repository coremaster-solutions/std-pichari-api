import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";
import { ICreateOfficeGroupsDto } from "../../domain/dtos";
import { OfficeGroupModel } from "../../domain/models";
import { IOfficeGroupsRepository } from "../../domain/repositories";
import { IGroupsRepository } from "@/groups/domain/repositories";
import { IOfficeRepository } from "@/offices/domain/repositories";
import { IPersonalRepository } from "@/personals/domain/repositories";

interface IRequest extends ICreateOfficeGroupsDto {}
export class CreateOfficeGroupService {
  constructor(
    private officeGroupsRepository: IOfficeGroupsRepository,
    private groupsRepository: IGroupsRepository,
    private officeRepository: IOfficeRepository,
    private personalRepository: IPersonalRepository
  ) {}
  async execute({
    officeId,
    groupId,
    personalId,
  }: IRequest): Promise<OfficeGroupModel> {
    const officeExists = await this.officeRepository.findById(officeId);
    if (!officeExists) {
      throw new AppError({
        message: `La oficina no existe con el id: ${officeId}`,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const groupExists = await this.groupsRepository.findById(groupId);
    if (!groupExists) {
      throw new AppError({
        message: `El grupo no existe con el id: ${groupId}`,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const personalExists = await this.personalRepository.findById(personalId);
    if (!personalExists) {
      throw new AppError({
        message: `El personal no existe con el id: ${personalId}`,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const groupOfficeExists =
      await this.officeGroupsRepository.findByOfficeIdGroupIdAndPersonalId({
        officeId,
        groupId,
        personalId,
      });
    if (groupOfficeExists) {
      throw new AppError({
        message: `El grupo de la oficina ya ha sido delegado al personal con el id: ${personalId} `,
        statusCode: httpStatus.BAD_REQUEST,
      });
    }

    const groupOffice = await this.officeGroupsRepository.create({
      groupId,
      officeId,
      personalId,
    });

    if (!groupOffice) {
      throw new AppError({
        message: "Error al crear el oficina del grupo",
        statusCode: httpStatus.BAD_REQUEST,
      });
    }

    return groupOffice;
  }
}
