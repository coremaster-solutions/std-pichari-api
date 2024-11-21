import { prismaService } from "@/shared/infrastructure/db";
import { DocumentTypePrismaRepository } from "../infrastructure/prisma/DocumentTypePrismaRepository";
import {
  CreateDocumentTypeService,
  GetAllDocumentTypeService,
  GetOneDocumentTypeService,
  RemoveOneDocumentTypeService,
  UpdateDocumentTypeService,
} from "../application/v1";
import { DocumentTypesController } from "@/shared/infrastructure/http/controllers";

const prismaDocumentTypeRepository = new DocumentTypePrismaRepository(
  prismaService
);

const createDocumentTypeService = new CreateDocumentTypeService(
  prismaDocumentTypeRepository
);
const updateDocumentTypeService = new UpdateDocumentTypeService(
  prismaDocumentTypeRepository
);
const getAllDocumentTypeService = new GetAllDocumentTypeService(
  prismaDocumentTypeRepository
);
const getDocumentTypeDetailService = new GetOneDocumentTypeService(
  prismaDocumentTypeRepository
);
const removeOneDocumentTypeService = new RemoveOneDocumentTypeService(
  prismaDocumentTypeRepository
);

export const documentTypesController = new DocumentTypesController(
  createDocumentTypeService,
  getAllDocumentTypeService,
  updateDocumentTypeService,
  getDocumentTypeDetailService,
  removeOneDocumentTypeService
);
