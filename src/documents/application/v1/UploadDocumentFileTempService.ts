import { AppError } from "@/shared/domain/models";
import {
  IUploadFileProvider,
  IWordToPDFProvider,
} from "@/shared/infrastructure/containers";
import { join } from "path";
interface IRequest {
  documentTempUrl: string;
}

export class UploadDocumentFileTempService {
  constructor(
    private wordToPDFProvider: IWordToPDFProvider,
    private uploadFileProvider: IUploadFileProvider
  ) {}

  async execute({ documentTempUrl }: IRequest): Promise<any> {
    if (documentTempUrl.match(/\.(doc|docx)$/)) {
      const systemPDFPath = documentTempUrl.replace(/\.(doc|docx)$/, ".pdf");
      const dirTempPath = join(process.cwd(), "tmp");
      const wordFilePathRelative = join(process.cwd(), documentTempUrl);

      const response = await this.wordToPDFProvider.convert({
        documentWordUrl: wordFilePathRelative,
        pdfDirUrl: dirTempPath,
      });

      if (!response) {
        throw new AppError({
          message: "Error al convertir el archivo word",
        });
      }

      return systemPDFPath;
    }

    return documentTempUrl;
  }
}
