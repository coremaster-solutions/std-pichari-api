import { prismaOfficeGroupsRepository } from "@/office_groups/di";
import { PrismaPersonalRepository } from "@/personals/infrastructure/prisma/PrismaPersonalRepository";
import { prismaService } from "@/shared/infrastructure/db";
import { PersonalOfficesController } from "@/shared/infrastructure/http/controllers";
import {
  LeaveOfficeToPersonalService,
  DeleteOnePersonalOfficeService,
  GetAllOfficesByUserService,
  GetOnePersonalOfficeDelegateByPreviousPersonalIdService,
  DelegateOfficeToPersonalService,
  ReturnPersonalOfficeService,
} from "../application/v1";
import { PrismaPersonalOfficesRepository } from "../infrastructure/prisma";
import { prismaTrackingDocumentRepository } from "@/tracking_documents/di";
import { DocumentPrismaRepository } from "@/documents/infrastructure/prisma/DocumentPrismaRepository";

export const prismaPersonalOfficesRepository =
  new PrismaPersonalOfficesRepository(prismaService);

const prismaPersonalRepository = new PrismaPersonalRepository(prismaService);
const prismaDocumentRepository = new DocumentPrismaRepository(prismaService);

const deleteOnePersonalOfficeService = new DeleteOnePersonalOfficeService(
  prismaPersonalOfficesRepository
);
const leaveOfficeToPersonalService = new LeaveOfficeToPersonalService(
  prismaPersonalOfficesRepository,
  prismaOfficeGroupsRepository,
  prismaPersonalRepository
);

const getAllOfficesByUserService = new GetAllOfficesByUserService(
  prismaPersonalRepository
);
const returnPersonalOfficeService = new ReturnPersonalOfficeService(
  prismaPersonalOfficesRepository,
  prismaOfficeGroupsRepository,
  prismaPersonalRepository
);
const getOnePersonalOfficeDelegateByPreviousPersonalIdService =
  new GetOnePersonalOfficeDelegateByPreviousPersonalIdService(
    prismaOfficeGroupsRepository,
    prismaPersonalRepository
  );

const delegateOfficeToPersonalService = new DelegateOfficeToPersonalService(
  prismaPersonalRepository,
  prismaDocumentRepository,
  prismaTrackingDocumentRepository,
  leaveOfficeToPersonalService
);

export const personalOfficesController = new PersonalOfficesController(
  leaveOfficeToPersonalService,
  deleteOnePersonalOfficeService,
  getAllOfficesByUserService,
  returnPersonalOfficeService,
  getOnePersonalOfficeDelegateByPreviousPersonalIdService,
  delegateOfficeToPersonalService
);
