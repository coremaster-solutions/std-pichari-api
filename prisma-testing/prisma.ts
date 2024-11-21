import { PrismaClient, StatusProcedure } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const personalId = "0c74be1f-279a-4bce-9654-8b80d7bcdbfe";
  const personalId2 = "f9e91e9e-bb96-454a-885a-5381f362b0ad";
  const trackings = await prisma.trackingDocument.findMany({
    where: { destinyPersonalId: personalId },
  });

  const documents = await prisma.document.findMany({
    where: { creatorId: personalId },
  });

  await Promise.all(
    documents.map(async (doc) => {
      await prisma.document.update({
        where: { id: doc.id },
        data: { creator: { connect: { id: personalId2 } } },
      });
    })
  );

  await Promise.all(
    trackings.map(async (tracking) => {
      await prisma.trackingDocument.update({
        where: { id: tracking.id },
        data: { destinyPersonal: { connect: { id: personalId2 } } },
      });
    })
  );

  console.info("documents length: ", documents.length);
  console.log("trackingDocuments length: ", trackings.length);
}

main();

const statusProcedureEs: Record<StatusProcedure, string> = {
  PENDING_RECEPTION: "Pendiente a recepción",
  ATTENDED_DERIVED: "Atendido y derivado",
  IN_PROGRESS: "En proceso",
  OBSERVED: "Observado",
  ARCHIVED: "Archivado y finalizado",
};
