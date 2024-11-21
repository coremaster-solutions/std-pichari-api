-- CreateEnum
CREATE TYPE "StatusSend" AS ENUM ('SEND', 'UNSEND');

-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "statusSend" "StatusSend" DEFAULT 'UNSEND';
