import {
  redisProvider,
  signsProvider,
} from "@/shared/infrastructure/containers";
import {
  CreateResponseBySignsPeruService,
  GenerateTokenSignsPeruService,
  GetOneSignLogService,
  GetReasonListToSignService,
  ReturnResponseBySignsPeruService,
  UpdateSignLogService,
  UploadSignedDocumentSignsPeruService,
} from "../applications/v1";
import { SignsController } from "@/shared/infrastructure/http/controllers";
import { prismaService } from "@/shared/infrastructure/db";
import { PrismaSignLogRepository } from "../infrastructure/repositories";

const generateTokenSignsPeru = new GenerateTokenSignsPeruService(signsProvider);
const prismaSignLogRepository = new PrismaSignLogRepository(prismaService);

const createResponseBySignsPeruService = new CreateResponseBySignsPeruService(
  signsProvider,
  prismaSignLogRepository
);

const returnResponseBySignsPeruService = new ReturnResponseBySignsPeruService(
  signsProvider,
  prismaSignLogRepository
);

const updateSignLogService = new UpdateSignLogService(prismaSignLogRepository);

const getOneSignLogService = new GetOneSignLogService(prismaSignLogRepository);

const uploadSignedDocumentSignsPeruService =
  new UploadSignedDocumentSignsPeruService(prismaSignLogRepository);

const getReasonListToSignService = new GetReasonListToSignService();

export const singsController = new SignsController(
  generateTokenSignsPeru,
  createResponseBySignsPeruService,
  returnResponseBySignsPeruService,
  updateSignLogService,
  getOneSignLogService,
  uploadSignedDocumentSignsPeruService,
  getReasonListToSignService
);
