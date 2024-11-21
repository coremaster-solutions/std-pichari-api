import { Prisma } from "@prisma/client";

export type ICreateDocumentWithCitizenRequestDto =
  Prisma.DocumentCreateInput & {
    documentTypeId: string;
    destinyOfficeId: string;
    citizen: Prisma.CitizenCreateInput;

    creatorId?: string;
    originOfficeId?: string;
  };
