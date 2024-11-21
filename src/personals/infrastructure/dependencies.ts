import { PrismaPersonalOfficesRepository } from "@/personals_offices/infrastructure/prisma";
import {
  UploadFileProvider,
  encryptProvider,
  jobsProvider,
  jwtProvider,
  redisProvider,
} from "@/shared/infrastructure/containers";
import { PersonalsController } from "@/shared/infrastructure/http/controllers";
import { prismaService } from "../../shared/infrastructure/db";
import {
  CreatePersonalService,
  ForgotPasswordPersonalService,
  GetAllPersonalService,
  GetPersonalDetailService,
  LoginPersonalService,
  MeService,
  RefreshTokenService,
  RemoveOnePersonalService,
  ResetPasswordPersonalService,
  UpdateAvatarPersonalService,
  UpdatePersonalService,
} from "../application/v1";
import { PrismaPersonalRepository } from "./prisma/PrismaPersonalRepository";
import { PrismaOfficeGroupsRepository } from "@/office_groups/infrastructure/prisma";
export const prismaPersonalOfficesRepository =
  new PrismaPersonalOfficesRepository(prismaService);

export const prismaPersonalRepository = new PrismaPersonalRepository(
  prismaService
);
const prismaOfficeGroupsRepository = new PrismaOfficeGroupsRepository(
  prismaService
);

const uploadFileProvider = new UploadFileProvider();

const createPersonalService = new CreatePersonalService(
  prismaPersonalRepository,
  encryptProvider.bcrypt,
  uploadFileProvider,
  prismaPersonalOfficesRepository
);
const updatePersonalService = new UpdatePersonalService(
  prismaPersonalRepository,
  encryptProvider.bcrypt,
  uploadFileProvider,
  prismaPersonalOfficesRepository
);
const getAllPersonalService = new GetAllPersonalService(
  prismaPersonalRepository,
  prismaOfficeGroupsRepository
);
const loginPersonalService = new LoginPersonalService(
  prismaPersonalRepository,
  encryptProvider.bcrypt,
  jwtProvider
);
const getPersonalDetailService = new GetPersonalDetailService(
  prismaPersonalRepository
);
const removeOnePersonalService = new RemoveOnePersonalService(
  prismaPersonalRepository
);
const refreshTokenService = new RefreshTokenService(
  prismaPersonalRepository,
  jwtProvider
);

const updateAvatarPersonalService = new UpdateAvatarPersonalService(
  prismaPersonalRepository,
  uploadFileProvider
);

const forgotPasswordPersonalService = new ForgotPasswordPersonalService(
  prismaPersonalRepository,
  jobsProvider,
  redisProvider
);
const resetPasswordPersonalService = new ResetPasswordPersonalService(
  prismaPersonalRepository,
  encryptProvider.bcrypt,
  redisProvider
);

const meService = new MeService(prismaPersonalRepository);

export const personalsController = new PersonalsController(
  createPersonalService,
  getAllPersonalService,
  loginPersonalService,
  updatePersonalService,
  getPersonalDetailService,
  removeOnePersonalService,
  refreshTokenService,
  updateAvatarPersonalService,
  forgotPasswordPersonalService,
  resetPasswordPersonalService,
  meService
);
