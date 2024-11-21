import { PersonalOfficeModel } from "@/personals_offices/domain/models";
import { Office } from "@prisma/client";

export interface OfficeModel extends Office {
  personals?: PersonalOfficeModel[] | null;
}
