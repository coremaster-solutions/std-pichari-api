-- CreateEnum
CREATE TYPE "StatusSignDocument" AS ENUM ('INITIAL', 'CANCELED', 'PENDING', 'ERROR', 'SIGNED');

-- CreateTable
CREATE TABLE "sign_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "status" "StatusSignDocument" NOT NULL DEFAULT 'INITIAL',
    "provider" TEXT NOT NULL,
    "documentUrl" TEXT NOT NULL,
    "dataResponse" JSONB NOT NULL,

    CONSTRAINT "sign_logs_pkey" PRIMARY KEY ("id")
);
