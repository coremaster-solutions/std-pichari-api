import { PrismaClient } from "@prisma/client";

export class PrismaService extends PrismaClient {
  constructor() {
    super();
    this.$disconnect();
  }
}

export const messageMapPrisma = {
  P2002: (model: string) => `${model} ya ha sido registrado`,
  P2000: (model: string) =>
    `${model} los campos tiene caracteres mayores al permitido`,
  P2025: (model: string) => `${model} no existe`,
  P2010: (model: string) => `${model} no existe`,
};

export type MessageMapTypePrisma = keyof typeof messageMapPrisma;

type setPaginationParamsTypes = {
  query: { perPage?: number; page?: number };
  modelTotal: number;
};

export const getPaginationLinks = async ({
  query,
  modelTotal,
}: setPaginationParamsTypes) => {
  const { perPage, page } = query;

  const perPageQuery = Number(perPage) || 10;
  const pageQuery = Number(page) || 1;

  const offsetSkip = (pageQuery - 1) * perPageQuery;
  const lastPage = Math.round(modelTotal / perPageQuery) || 1;

  return { offsetSkip, lastPage, perPage: perPageQuery, page: pageQuery };
};
