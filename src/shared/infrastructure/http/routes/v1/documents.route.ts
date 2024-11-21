import { documentsController } from "@/documents/di";
import { Request, Response, Router } from "express";
import { isAuthenticate, validateSchema } from "../../middleware";
import {
  archiveProcedureBodySchema,
  attachmentFilesProcedureBodySchema,
  deriveProcedureBodySchema,
  documentCreateAdminBodySchema,
  documentGetAllPendingAndDerivedQuerySchema,
  documentGetAllQuerySchema,
  documentGetCountAllQueryByStatusSchema,
  documentGetCountYearAllQueryByStatusSchema,
  documentUpdateBodySchema,
  documentWithCitizenCreateBodySchema,
  documentWithTrackingsQuerySchema,
  observeProcedureBodySchema,
  paramsIdSchema,
  receiveProcedureBodySchema,
  returnProcedureBodySchema,
  shareDocumentBodySchema,
  unarchiveProcedureBodySchema,
} from "../../schemas";

export class DocumentsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get(
      "/",
      [validateSchema({ query: documentGetAllQuerySchema })],
      (req: Request, res: Response) => documentsController.findAll(req, res)
    );

    this.router.post(
      "/",
      validateSchema({
        body: documentCreateAdminBodySchema,
      }),
      (req, res) => documentsController.create(req, res)
    );

    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: documentUpdateBodySchema,
      }),
      (req, res) => documentsController.update(req, res)
    );

    this.router.get(
      "/:id/correlative-number",
      [
        validateSchema({
          params: paramsIdSchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.getLastCorrelativeNumberById(req, res)
    );

    this.router.get(
      "/summary-count",
      [
        isAuthenticate,
        validateSchema({ query: documentGetCountAllQueryByStatusSchema }),
      ],
      (req: Request, res: Response) =>
        documentsController.countDocuments(req, res)
    );

    this.router.get(
      "/count-summary-year-graphic-bar-by-status",
      [
        isAuthenticate,
        validateSchema({ query: documentGetCountYearAllQueryByStatusSchema }),
      ],
      (req: Request, res: Response) =>
        documentsController.getSummaryCountBarGraphicYearByStatus(req, res)
    );

    this.router.get(
      "/citizen-procedures",
      [validateSchema({ query: documentGetAllQuerySchema })],
      (req: Request, res: Response) =>
        documentsController.findAllCitizenProcedures(req, res)
    );

    this.router.get(
      "/me",
      [isAuthenticate, validateSchema({ query: documentGetAllQuerySchema })],
      (req: Request, res: Response) => documentsController.findAllMe(req, res)
    );

    this.router.get(
      "/trackings",
      [
        validateSchema({
          query: documentWithTrackingsQuerySchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.getOneWithTrackings(req, res)
    );

    this.router.get(
      "/pending-and-derived",
      [
        isAuthenticate,
        validateSchema({ query: documentGetAllPendingAndDerivedQuerySchema }),
      ],
      (req: Request, res: Response) =>
        documentsController.findAllPendingAndDerived(req, res)
    );

    this.router.get(
      "/in-progress",
      [isAuthenticate, validateSchema({ query: documentGetAllQuerySchema })],
      (req: Request, res: Response) =>
        documentsController.findAllInProgress(req, res)
    );

    this.router.get(
      "/observed",
      [isAuthenticate, validateSchema({ query: documentGetAllQuerySchema })],
      (req: Request, res: Response) =>
        documentsController.findAllObserved(req, res)
    );

    this.router.get(
      "/archived",
      [isAuthenticate, validateSchema({ query: documentGetAllQuerySchema })],
      (req: Request, res: Response) =>
        documentsController.findAllArchived(req, res)
    );

    this.router.get(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => documentsController.findOneById(req, res)
    );

    this.router.delete(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => documentsController.removeOne(req, res)
    );

    this.router.post(
      "/upload",
      // uploadFileMulterTemp.single("file"),
      (req, res) => documentsController.uploadDocument(req, res)
    );

    this.router.post(
      "/citizen",
      validateSchema({
        body: documentWithCitizenCreateBodySchema,
      }),
      (req, res) => documentsController.createCitizen(req, res)
    );

    this.router.post(
      "/derive",
      [
        isAuthenticate,
        validateSchema({
          body: deriveProcedureBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.deriveDocument(req, res)
    );

    this.router.post(
      "/receive",
      [
        isAuthenticate,
        validateSchema({
          body: receiveProcedureBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.receiveDocument(req, res)
    );

    this.router.post(
      "/observe",
      [
        isAuthenticate,
        validateSchema({
          body: observeProcedureBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.observeDocument(req, res)
    );

    this.router.post(
      "/archive",
      [
        isAuthenticate,
        validateSchema({
          body: archiveProcedureBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.archiveDocument(req, res)
    );

    this.router.post(
      "/unarchive",
      [
        validateSchema({
          body: unarchiveProcedureBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.unarchiveDocument(req, res)
    );

    this.router.post(
      "/attachment-files",
      [
        isAuthenticate,
        validateSchema({
          body: attachmentFilesProcedureBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.attachmentFileDocument(req, res)
    );

    this.router.post(
      "/send-email-document",
      [
        isAuthenticate,
        validateSchema({
          body: shareDocumentBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.shareDocumentByEmails(req, res)
    );

    this.router.post(
      "/return",
      [
        validateSchema({
          body: returnProcedureBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        documentsController.returnProcedure(req, res)
    );

    return this.router;
  }
}
