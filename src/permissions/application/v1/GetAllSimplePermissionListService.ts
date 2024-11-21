import { IFindAllSimpleDto } from "../../domain/dtos";
import { IPermissionsRepository } from "../../domain/repositories";

interface IRequest extends IFindAllSimpleDto {
  id: string;
}
export class GetAllSimplePermissionListService {
  constructor(private permissionsRepository: IPermissionsRepository) {}
  async execute(queryData: IRequest): Promise<any> {
    const permissions = await this.permissionsRepository.findAllSimple(
      queryData
    );

    const parentPermissions = permissions.filter(
      (permission) => !permission.value.includes("sub_vm")
    );
    const parentAndChildrenPermissions = parentPermissions.map(
      (permission) => ({
        id: permission.id,
        value: permission.value,
        description: permission.description,
        children: permissions
          .filter((perm) => perm.value.includes("sub_vm"))
          .filter((per) => per.value.includes(permission.value)),
      })
    );

    return {
      message: "Successful",
      code: "000000",
      data: parentAndChildrenPermissions,
    };
  }
}
