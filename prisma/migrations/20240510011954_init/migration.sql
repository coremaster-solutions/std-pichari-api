/*
  Warnings:

  - You are about to drop the `Office` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_originOfficeId_fkey";

-- DropTable
DROP TABLE "Office";

-- CreateTable
CREATE TABLE "offices" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "description" TEXT,
    "number" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "offices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "offices_number_key" ON "offices"("number");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_originOfficeId_fkey" FOREIGN KEY ("originOfficeId") REFERENCES "offices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
