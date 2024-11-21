import { DocumentModel } from "@/documents/domain/models";
import { statusProcedureEs } from "@/documents/locale";
import { PersonalModel } from "@/personals/domain/models";
import { getFullName } from "@/personals/utils";
import { generateHeader, generateHr, generateTableRow } from "@/shared/utils";
import PDFDocument from "pdfkit";

export function proceduresPDF(
  procedures: DocumentModel[],
  dataCallback: any,
  endCallback: any
) {
  let doc = new PDFDocument({ margin: 50, layout: "landscape", size: "A4" });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  generateHeader(doc, "Reporte de trámites");
  generateProcedureTable(doc, procedures);

  doc.end();
}

function generateProcedureTable(
  doc: PDFKit.PDFDocument,
  procedures: DocumentModel[]
) {
  let i;
  const proceduresTableTop = 150;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    proceduresTableTop,
    "N° de trámite inicial",
    "N° de trámite actual",
    "Oficina y personal actual",
    "Asunto",
    "Estado"
  );
  generateHr(doc, proceduresTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < procedures.length; i++) {
    const item = procedures[i];
    const position = proceduresTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.procedureNumber,
      item.tracking?.procedureNumber ?? "",
      `${item.tracking?.destinyOffice?.name ?? ""}\n${
        item.tracking?.destinyPersonal
          ? getFullName(item.tracking?.destinyPersonal!)
          : "Recepción pendiente"
      } `,
      item.issue,
      statusProcedureEs[item.tracking?.statusProcedure ?? "ARCHIVED"]
    );

    generateHr(doc, position + 25);
  }

  doc.font("Helvetica");
}
