import { extension } from "prisma-paginate";
import { createPaginator } from "prisma-pagination";
import { PrismaService } from "./prisma-service";

export const prismaService = new PrismaService().$extends(extension);
export const paginate = createPaginator({ perPage: 10 });
export type TPrismaService = typeof prismaService;
export * from "./prisma-service";
export interface IPaginationMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev?: number | null;
  next?: number | null;
}

export interface IDataWithPagination<T> {
  data: T;
  metadata: IPaginationMeta;
}
