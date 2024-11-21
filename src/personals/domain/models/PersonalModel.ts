import { PersonalOfficeModel } from "@/personals_offices/domain/models";
import { Personal } from "@prisma/client";

export interface PersonalModel extends Personal {
  personalOffices?: PersonalOfficeModel[];
}
