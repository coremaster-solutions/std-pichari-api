import {
  ICreateOfficeGroupsDto,
  IDeleteByGroupIdAndOfficeIdAndPersonalId,
  IFindByOfficeIdGroupIdAndPersonalId,
  IUpdateOfficeGroupDto,
} from "../dtos";
import { OfficeGroupModel } from "../models";

export interface IOfficeGroupsRepository {
  create(data: ICreateOfficeGroupsDto): Promise<OfficeGroupModel | null>;
  updateByOfficeId(
    officeId: string,
    data: IUpdateOfficeGroupDto
  ): Promise<OfficeGroupModel | null>;
  updateById(
    id: string,
    data: IUpdateOfficeGroupDto
  ): Promise<OfficeGroupModel | null>;
  deleteByGroupIdAndOfficeId(
    params: IDeleteByGroupIdAndOfficeIdAndPersonalId
  ): Promise<any>;
  findByOfficeId(officeId: string): Promise<OfficeGroupModel | null>;
  findById(id: string): Promise<OfficeGroupModel | null>;
  findByOfficeIdGroupIdAndPersonalId(
    params: IFindByOfficeIdGroupIdAndPersonalId
  ): Promise<OfficeGroupModel | null>;
  deleteByOfficeId(officeId: string): Promise<any>;
  findOneGroupByOfficeIdAndPersonalId(
    params: Omit<ICreateOfficeGroupsDto, "groupId">
  ): Promise<OfficeGroupModel | null>;
  findOneGroupOfficeByOfficeIdAndGroupId(
    params: Omit<ICreateOfficeGroupsDto, "personalId">
  ): Promise<OfficeGroupModel | null>;
  deleteById(id: string): Promise<any>;
  findOnePersonalIdToReturn(
    personalIdToReturn: string
  ): Promise<OfficeGroupModel | null>;
}
