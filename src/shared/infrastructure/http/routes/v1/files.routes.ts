import { Router } from "express";
import { uploadFileMulterTemp } from "../../middleware";
import { FilesController } from "../../controllers";
import { whatsAppProvider } from "@/shared/infrastructure/containers";
import { uploadDocumentFileTempService } from "@/documents/di";

export class FilesRoute {
  private router: Router;
  private filesController: FilesController;

  constructor() {
    this.router = Router();
    this.filesController = new FilesController(
      whatsAppProvider,
      uploadDocumentFileTempService
    );
  }

  register() {
    this.router.post(
      "/upload-temp",
      uploadFileMulterTemp.single("file"),
      (req, res) => this.filesController.uploadTemp(req, res)
    );

    this.router.post("/upload-doc-temp", (req, res) =>
      this.filesController.uploadDocumentTemp(req, res)
    );

    this.router.post("/whatsapp-message", (req, res) =>
      this.filesController.sendMessage(req, res)
    );

    return this.router;
  }
}
