import { Role } from "@prisma/client";

export const RoleEnum = Role;
export type RoleType = keyof typeof Role;
