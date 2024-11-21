import { prismaService } from "@/shared/infrastructure/db";
import { AttachmentFilePrismaRepository } from "../infrastructure/prisma/AttachmentFilePrismaRepository";

export const prismaAttachmentFileRepository =
  new AttachmentFilePrismaRepository(prismaService);
