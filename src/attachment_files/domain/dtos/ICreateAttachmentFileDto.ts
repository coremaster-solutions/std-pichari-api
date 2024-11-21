import { Prisma } from "@prisma/client";

export interface ICreateAttachmentFileDto
  extends Prisma.AttachmentFileCreateInput {}
