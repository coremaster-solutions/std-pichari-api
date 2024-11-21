-- AlterTable
ALTER TABLE "documents" ADD COLUMN     "attentionPriority" TEXT,
ADD COLUMN     "copyDerivation" BOOLEAN DEFAULT false,
ADD COLUMN     "documentDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "procedureType" TEXT,
ADD COLUMN     "shippingAverage" TEXT;
