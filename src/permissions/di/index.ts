import { prismaService } from "@/shared/infrastructure/db";
import { PrismaPermissionsRepository } from "../infrastructure/prisma";
import {
  CreatePermissionService,
  DeleteOnePermissionService,
  GetAllSimplePermissionListService,
  GetOnePermissionService,
  UpdateOnePermissionService,
} from "../application/v1";
import { PermissionsController } from "@/shared/infrastructure/http/controllers";

export const prismaPermissionsRepository = new PrismaPermissionsRepository(
  prismaService
);

const createPermissionService = new CreatePermissionService(
  prismaPermissionsRepository
);

const getAllSimplePermissionListService = new GetAllSimplePermissionListService(
  prismaPermissionsRepository
);

const updateOnePermissionService = new UpdateOnePermissionService(
  prismaPermissionsRepository
);

const getOnePermissionService = new GetOnePermissionService(
  prismaPermissionsRepository
);

const deleteOnePermissionService = new DeleteOnePermissionService(
  prismaPermissionsRepository
);

export const permissionsController = new PermissionsController(
  createPermissionService,
  getAllSimplePermissionListService,
  updateOnePermissionService,
  getOnePermissionService,
  deleteOnePermissionService
);
