import { OfficeGroupModel } from "@/office_groups/domain/models";
import { IOfficeGroupsRepository } from "@/office_groups/domain/repositories";
import { OfficeModel } from "@/offices/domain/models";
import { PersonalModel } from "@/personals/domain/models";
import { IPersonalRepository } from "@/personals/domain/repositories";
import { PersonalOfficeModel } from "@/personals_offices/domain/models";
import { IPersonalOfficesRepository } from "@/personals_offices/domain/repositories";
import { AppError } from "@/shared/domain/models";
import httpStatus from "http-status";

interface IRequest {
  currentPersonalId: string;
  personalIdToLeave: string;
}
export class LeaveOfficeToPersonalService {
  constructor(
    private personalOfficesRepository: IPersonalOfficesRepository,
    private officeGroupsRepository: IOfficeGroupsRepository,
    private personalRepository: IPersonalRepository
  ) {}
  async execute({
    currentPersonalId,
    personalIdToLeave,
  }: IRequest): Promise<any> {
    const currentPersonal = (await this.personalRepository.findById(
      currentPersonalId
    )) as PersonalModel & {
      groupOffices?: OfficeGroupModel[] | null;
    };

    if (!currentPersonal) {
      throw new AppError({
        message: `El personal actual no existe, con el id: ${currentPersonalId}`,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const personalToDelegate = (await this.personalRepository.findById(
      personalIdToLeave
    )) as PersonalModel & {
      groupOffices?: OfficeGroupModel[] | null;
    };

    if (!personalToDelegate) {
      throw new AppError({
        message: `El personal a delegar no existe, con el id: ${personalIdToLeave}`,
        statusCode: httpStatus.NOT_FOUND,
      });
    }

    const currentOfficeMain = currentPersonal.personalOffices?.find(
      (officePersonal) => officePersonal.isMain
    );

    if (!currentOfficeMain) {
      throw new AppError({
        message: `El personal no tiene una oficina principal a delegar`,
      });
    }
    const currentGroupOffice = currentPersonal.groupOffices?.find(
      (groupOffice) =>
        groupOffice.officeId === currentOfficeMain?.officeId &&
        groupOffice.personalId === currentPersonal?.id
    );

    const personalToDelegateOfficeMain =
      personalToDelegate.personalOffices?.find((officePer) => officePer.isMain);

    const personalToDelegateGroupOffice =
      personalToDelegate?.groupOffices?.find(
        (groupOffice) =>
          groupOffice.officeId === personalToDelegateOfficeMain?.officeId &&
          groupOffice.personalId === personalToDelegate?.id
      );

    const personalToDelegateLast = personalToDelegate.personalOffices?.pop();
    const personalToDelegateGroupLast = personalToDelegate.groupOffices?.pop();

    if (
      personalToDelegate?.id === personalToDelegateLast?.personalId &&
      currentOfficeMain.position === personalToDelegateLast?.position &&
      currentGroupOffice?.groupId === personalToDelegateGroupLast?.groupId
    ) {
      throw new AppError({
        message: `El personal ya tiene la oficina delegada (${
          (currentOfficeMain as PersonalOfficeModel & { office: OfficeModel })
            .office?.name
        }) con el cargo (${currentOfficeMain.position})`,
      });
    }

    let personalOfficeDelegate: PersonalOfficeModel;
    let groupOfficeDelegate: OfficeGroupModel | null;
    if (
      currentOfficeMain &&
      personalToDelegateOfficeMain &&
      currentOfficeMain.officeId === personalToDelegateOfficeMain?.officeId
    ) {
      personalOfficeDelegate = await this.personalOfficesRepository.update(
        personalToDelegateOfficeMain?.id ?? "",
        {
          position: currentOfficeMain?.position ?? "",
        }
      );
      groupOfficeDelegate = await this.officeGroupsRepository.updateById(
        personalToDelegateGroupOffice?.id ?? "",
        {
          officeId: currentGroupOffice?.officeId ?? "",
          groupId: currentGroupOffice?.groupId ?? "",
          previousDataPersonal: {
            personalId: personalToDelegateGroupOffice?.personalId ?? "",
            groupId: personalToDelegateGroupOffice?.groupId ?? "",
            position: personalToDelegateOfficeMain?.position ?? "",
          },
          personalIdToReturn: currentPersonal.id,
        }
      );
    } else {
      personalOfficeDelegate = await this.personalOfficesRepository.create({
        officeId: currentOfficeMain?.officeId ?? "",
        personalId: personalToDelegate.id,
        position: currentOfficeMain?.position ?? "",
      });
      groupOfficeDelegate = await this.officeGroupsRepository.create({
        officeId: currentGroupOffice?.officeId ?? "",
        groupId: currentGroupOffice?.groupId ?? "",
        personalId: personalToDelegate.id,
        personalIdToReturn: currentPersonal.id,
      });
    }

    return {
      message: "Successful",
      code: "000000",
      data: {
        personalOffice: personalOfficeDelegate! ?? null,
        group: groupOfficeDelegate! ?? null,
      },
    };

    // Dejar a cargo temporalmente la oficina
    // Si es crear otro oficina crear otra row con del clone de la oficina a delegar con el personalIdToLeave
    // Si es misma oficina -> solo actualizar el grupo y la position -> guardar los datos anteriores (grupo y la position) de que va ser delegado (personalIdToLeave)
    // BODY -> personalID parent
    //      -> personalID child

    // Delegar a cargo la oficina
    // BODY -> personalID parent
    //      -> personalID child
    // Inhabilitar usuario que va dejar la entidad
    // Actualizar su id de creator (documento) y destinyPersonalId (Trámites actuales "seguimiento"), actualizar el nuevo campo previousDestinyPersonalId
    // Solo actualizar el grupo y la position -> guardar los datos anteriores (grupo y la position) de que va ser delegado (personalIdToLeave)
  }
}
