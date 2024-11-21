import { AppError } from "@/shared/domain/models";

import { LibreOfficeFileConverter } from "libreoffice-file-converter";
import { ConvertDto, IWordToPDFProvider } from "../models";

export class WordToPDFProvider implements IWordToPDFProvider {
  async convert({
    documentWordUrl,
    pdfDirUrl: documentPDFUrl,
  }: ConvertDto): Promise<boolean> {
    try {
      const libreOfficeFileConverter = new LibreOfficeFileConverter();

      console.log("documentPDFUrl", documentPDFUrl);

      await libreOfficeFileConverter.convertFile(
        documentWordUrl,
        documentPDFUrl,
        "pdf"
      );
      return true;
    } catch (error) {
      console.log("ERROR: Convert Word to PDF::::", error);
      throw new AppError({
        message: "Error al convertir el documento",
      });
    }
  }
}
