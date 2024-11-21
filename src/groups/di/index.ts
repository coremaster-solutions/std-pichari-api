import { prismaService } from "@/shared/infrastructure/db";
import { PrismaGroupsRepository } from "../infrastructure/prisma";
import {
  CreateGroupService,
  DeleteOneGroupService,
  GetAllGroupService,
  GetAllSimpleGroupListService,
  GetOneGroupService,
  UpdateOneGroupService,
} from "../application/v1";
import { GroupsController } from "@/shared/infrastructure/http/controllers";
import { prismaGroupPermissionsRepository } from "@/group_permissions/di";
import { prismaPermissionsRepository } from "@/permissions/di";

export const prismaGroupsRepository = new PrismaGroupsRepository(prismaService);

const createGroupService = new CreateGroupService(
  prismaGroupsRepository,
  prismaPermissionsRepository,
  prismaGroupPermissionsRepository
);

const getAllSimpleGroupListService = new GetAllSimpleGroupListService(
  prismaGroupsRepository
);

const updateOneGroupService = new UpdateOneGroupService(
  prismaGroupsRepository,
  prismaPermissionsRepository,
  prismaGroupPermissionsRepository
);

const getOneGroupService = new GetOneGroupService(prismaGroupsRepository);

const deleteOneGroupService = new DeleteOneGroupService(prismaGroupsRepository);

const getAllGroupService = new GetAllGroupService(prismaGroupsRepository);

export const groupsController = new GroupsController(
  getAllGroupService,
  createGroupService,
  getAllSimpleGroupListService,
  updateOneGroupService,
  getOneGroupService,
  deleteOneGroupService
);
