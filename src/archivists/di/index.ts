import { prismaService } from "@/shared/infrastructure/db";
import { ArchivistPrismaRepository } from "../infrastructure/prisma/ArchivistPrismaRepository";
import {
  CreateArchivistService,
  GetAllArchivistService,
  GetOneArchivistService,
  RemoveOneArchivistService,
  UpdateArchivistService,
} from "../application/v1";
import { ArchivistsController } from "@/shared/infrastructure/http/controllers";

export const prismaArchivistRepository = new ArchivistPrismaRepository(
  prismaService
);

const createArchivistService = new CreateArchivistService(
  prismaArchivistRepository
);
const updateArchivistService = new UpdateArchivistService(
  prismaArchivistRepository
);
const getAllArchivistService = new GetAllArchivistService(
  prismaArchivistRepository
);
const getArchivistDetailService = new GetOneArchivistService(
  prismaArchivistRepository
);
const removeOneArchivistService = new RemoveOneArchivistService(
  prismaArchivistRepository
);

export const archivistsController = new ArchivistsController(
  createArchivistService,
  getAllArchivistService,
  updateArchivistService,
  getArchivistDetailService,
  removeOneArchivistService
);
