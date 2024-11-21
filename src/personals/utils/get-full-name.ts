import { PersonalModel } from "../domain/models";

export const getFullName = (personal: PersonalModel) => {
  return `${personal.firstName} ${personal.first_lastName} ${personal.second_lastName}`;
};
