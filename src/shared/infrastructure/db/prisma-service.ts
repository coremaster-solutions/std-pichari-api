import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "error",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
  ],
});

prisma.$on("query", (e) => {
  console.log("Query: " + e.query);
  console.log("Params: " + e.params);
  console.log("Duration: " + e.duration + "ms");
});

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
  const getDecimalLastPage = String((modelTotal / perPageQuery).toFixed(2))
    .split(".")
    .at(1);
  const isGreater =
    (getDecimalLastPage &&
      Number(getDecimalLastPage) > 0 &&
      Number(getDecimalLastPage) < 50 &&
      perPageQuery < modelTotal) ||
    false;

  const lastPage = Math.round(modelTotal / perPageQuery) || 1;
  console.log("getDecimalLastPage", Number(getDecimalLastPage));
  console.log("lastPage", lastPage);

  return {
    offsetSkip,
    lastPage: isGreater ? lastPage + 1 : lastPage,
    perPage: perPageQuery,
    page: pageQuery,
  };
};
