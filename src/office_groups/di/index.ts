import { prismaGroupsRepository } from "@/groups/di";
import { prismaOfficeRepository } from "@/offices/di";
import { prismaPersonalRepository } from "@/personals/infrastructure/dependencies";
import { prismaService } from "@/shared/infrastructure/db";
import { OfficeGroupsController } from "@/shared/infrastructure/http/controllers";
import {
  CreateOfficeGroupService,
  GetGroupOneByPersonalAndOfficeService,
  UpdateOneOfficeGroupService,
} from "../application/v1";
import { PrismaOfficeGroupsRepository } from "../infrastructure/prisma";

export const prismaOfficeGroupsRepository = new PrismaOfficeGroupsRepository(
  prismaService
);

const createOfficeGroupService = new CreateOfficeGroupService(
  prismaOfficeGroupsRepository,
  prismaGroupsRepository,
  prismaOfficeRepository,
  prismaPersonalRepository
);

export const getGroupOneByPersonalAndOfficeService =
  new GetGroupOneByPersonalAndOfficeService(prismaOfficeGroupsRepository);

const updateOneOfficeGroupService = new UpdateOneOfficeGroupService(
  prismaOfficeGroupsRepository,
  prismaGroupsRepository,
  prismaOfficeRepository,
  prismaPersonalRepository
);

export const officeGroupsController = new OfficeGroupsController(
  createOfficeGroupService,
  getGroupOneByPersonalAndOfficeService,
  updateOneOfficeGroupService
);
