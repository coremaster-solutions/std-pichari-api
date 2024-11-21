import { prismaArchivistRepository } from "@/archivists/di";
import { prismaService } from "@/shared/infrastructure/db";
import { OfficesController } from "@/shared/infrastructure/http/controllers";
import {
  CreateOfficeService,
  GetAllOfficeService,
  GetOneOfficeService,
  RemoveOneOfficeService,
  UpdateOfficeService,
} from "../application/v1";
import { OfficePrismaRepository } from "../infrastructure/prisma/OfficePrismaRepository";

export const prismaOfficeRepository = new OfficePrismaRepository(prismaService);

const createOfficeService = new CreateOfficeService(
  prismaOfficeRepository,
  prismaArchivistRepository
);
const updateOfficeService = new UpdateOfficeService(prismaOfficeRepository);
const getAllOfficeService = new GetAllOfficeService(prismaOfficeRepository);
const getOfficeDetailService = new GetOneOfficeService(prismaOfficeRepository);
const removeOneOfficeService = new RemoveOneOfficeService(
  prismaOfficeRepository
);

export const officesController = new OfficesController(
  createOfficeService,
  getAllOfficeService,
  updateOfficeService,
  getOfficeDetailService,
  removeOneOfficeService
);
