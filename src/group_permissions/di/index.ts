import { prismaService } from "@/shared/infrastructure/db";
import { PrismaGroupPermissionsRepository } from "../infrastructure/prisma";

export const prismaGroupPermissionsRepository =
  new PrismaGroupPermissionsRepository(prismaService);
