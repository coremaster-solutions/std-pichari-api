import {
  ArchiveProcedureService,
  AttachmentFileProcedureService,
  CreateDocumentCitizenService,
  CreateDocumentService,
  DeriveProcedureService,
  GetAllCitizenProceduresService,
  GetAllDocumentArchivedService,
  GetAllDocumentInProgressService,
  GetAllDocumentObservedService,
  GetAllDocumentPendingAndDerivedService,
  GetAllDocumentService,
  GetAllDocumentServiceMe,
  GetAllDocumentSharedService,
  GetLastCorrelativeNumberDocumentService,
  GetOneDocumentService,
  GetOneDocumentWithAllTrackingsService,
  GetSummaryCountAllDocumentsService,
  GetYearSummaryCountDashboardBarGraphicDocumentsByStatusService,
  IArchiveProcedureRequest,
  IAttachmentFilesProcedureRequest,
  ICreateDocumentServiceRequest,
  IDeriveProcedureRequest,
  IObserveProcedureRequest,
  IReceiveProcedureRequest,
  IUnarchiveProcedureServiceRequest,
  ObserveProcedureService,
  ReceiveProcedureService,
  RemoveOneDocumentService,
  ReturnProcedureService,
  ShareDocumentByEmailsService,
  UnarchiveProcedureService,
  UpdateDocumentService,
} from "@/documents/application/v1";
import {
  ICreateDocumentWithCitizenRequestDto,
  IFindOneWithCitizen,
  IUpdateDocumentDto,
} from "@/documents/domain/dtos";
import { AppError } from "@/shared/domain/models";
import { RequestUser } from "@/types";
import { Request, Response } from "express";
import path from "path";
import { uploadFileMulterTemp } from "../../middleware";
import { BaseController } from "../../models";

export class DocumentsController extends BaseController {
  constructor(
    private createDocumentService: CreateDocumentService,
    private getAllDocumentService: GetAllDocumentService,
    private updateDocumentService: UpdateDocumentService,
    private getDocumentDetailService: GetOneDocumentService,
    private removeOneDocumentService: RemoveOneDocumentService,
    private createDocumentCitizenService: CreateDocumentCitizenService,
    private deriveProcedureService: DeriveProcedureService,
    private getOneDocumentWithTrackingsService: GetOneDocumentWithAllTrackingsService,
    private getAllDocumentMeService: GetAllDocumentServiceMe,
    private getAllDocumentPendingAndDerivedService: GetAllDocumentPendingAndDerivedService,
    private getAllDocumentInProgressService: GetAllDocumentInProgressService,
    private getAllDocumentObservedService: GetAllDocumentObservedService,
    private getAllDocumentArchivedService: GetAllDocumentArchivedService,
    private receiveProcedureService: ReceiveProcedureService,
    private observeProcedureService: ObserveProcedureService,
    private archiveProcedureService: ArchiveProcedureService,
    private attachmentFileProcedureService: AttachmentFileProcedureService,
    private getAllDocumentByDocumentNumberService: GetAllCitizenProceduresService,
    private getLastCorrelativeNumberDocumentService: GetLastCorrelativeNumberDocumentService,
    private getSummaryCountAllDocumentsService: GetSummaryCountAllDocumentsService,
    private unarchiveProcedureService: UnarchiveProcedureService,
    private getSummaryCountDashboardBarGraphicDocumentsYearByStatusService: GetYearSummaryCountDashboardBarGraphicDocumentsByStatusService,
    private shareDocumentByEmailsService: ShareDocumentByEmailsService,
    private returnProcedureService: ReturnProcedureService,
    private getAllDocumentSharedService: GetAllDocumentSharedService
  ) {
    super();
  }

  async findAllShared(req: Request, res: Response): Promise<any> {
    try {
      const query = req.query as any;
      const personalId = (req as RequestUser).userId;
      const documents = await this.getAllDocumentSharedService.execute({
        ...query,
        personalId,
      });

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async returnProcedure(req: Request, res: Response): Promise<any> {
    try {
      const response = await this.returnProcedureService.execute(req.body);

      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async shareDocumentByEmails(req: Request, res: Response): Promise<any> {
    try {
      const response = await this.shareDocumentByEmailsService.execute(
        req.body
      );

      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async getSummaryCountBarGraphicYearByStatus(
    req: Request,
    res: Response
  ): Promise<any> {
    const query = req.query as any;
    const userId = (req as RequestUser).userId;
    try {
      const response =
        await this.getSummaryCountDashboardBarGraphicDocumentsYearByStatusService.execute(
          {
            ...query,
            userId,
          }
        );
      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async unarchiveDocument(req: Request, res: Response): Promise<any> {
    const body = req.body as IUnarchiveProcedureServiceRequest;
    try {
      const tracking = await this.unarchiveProcedureService.execute({
        ...body,
      });
      return this.ok(res, tracking);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async getLastCorrelativeNumberById(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const response =
        await this.getLastCorrelativeNumberDocumentService.execute(req.params);

      return this.ok(res, response);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async countDocuments(req: Request, res: Response): Promise<any> {
    const userId = (req as RequestUser).userId;
    try {
      const documents = await this.getSummaryCountAllDocumentsService.execute({
        userId,
      });

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAllCitizenProcedures(req: Request, res: Response): Promise<any> {
    try {
      const documents =
        await this.getAllDocumentByDocumentNumberService.execute(req.query);

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async attachmentFileDocument(req: Request, res: Response): Promise<any> {
    const body = req.body as IAttachmentFilesProcedureRequest;

    try {
      const tracking = await this.attachmentFileProcedureService.execute({
        ...body,
      });
      return this.ok(res, tracking);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async archiveDocument(req: Request, res: Response): Promise<any> {
    const body = req.body as IArchiveProcedureRequest;
    const personalId = (req as RequestUser).userId;

    try {
      const tracking = await this.archiveProcedureService.execute({
        ...body,
        personalId,
      });
      return this.ok(res, tracking);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async observeDocument(req: Request, res: Response): Promise<any> {
    const body = req.body as IObserveProcedureRequest;

    try {
      const tracking = await this.observeProcedureService.execute({
        ...body,
      });
      return this.ok(res, tracking);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async receiveDocument(req: Request, res: Response): Promise<any> {
    const body = req.body as IReceiveProcedureRequest;
    const userId = (req as RequestUser).userId;

    try {
      const tracking = await this.receiveProcedureService.execute({
        ...body,
        destinyPersonalId: userId,
      });
      return this.ok(res, tracking);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAllPendingAndDerived(req: Request, res: Response): Promise<any> {
    const personalId = (req as RequestUser).userId;
    try {
      const documents =
        await this.getAllDocumentPendingAndDerivedService.execute({
          ...req.query,
          personalId,
        });

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAllInProgress(req: Request, res: Response): Promise<any> {
    const destinyPersonalId = (req as RequestUser).userId;
    try {
      const documents = await this.getAllDocumentInProgressService.execute({
        ...req.query,
        destinyPersonalId,
      });

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAllObserved(req: Request, res: Response): Promise<any> {
    const destinyPersonalId = (req as RequestUser).userId;
    try {
      const documents = await this.getAllDocumentObservedService.execute({
        ...req.query,
        destinyPersonalId,
      });

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAllArchived(req: Request, res: Response): Promise<any> {
    const destinyPersonalId = (req as RequestUser).userId;
    try {
      const documents = await this.getAllDocumentArchivedService.execute({
        ...req.query,
        destinyPersonalId,
      });

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async getOneWithTrackings(req: Request, res: Response): Promise<any> {
    const query = req.query as IFindOneWithCitizen;

    try {
      const document = await this.getOneDocumentWithTrackingsService.execute(
        query
      );
      return this.ok(res, document);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async deriveDocument(req: Request, res: Response): Promise<any> {
    const body = req.body as IDeriveProcedureRequest;
    const userId = (req as RequestUser).userId;

    try {
      const tracking = await this.deriveProcedureService.execute({
        ...body,
        originPersonalId: userId,
      });
      return this.ok(res, tracking);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async uploadDocument(req: any, res: Response): Promise<any> {
    uploadFileMulterTemp.single("file")(req, res, (err: any) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: err });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Please send file" });
      }
      console.log(req.file.path.toString().replace("tmp/uploads", "uploads")); // uploads/file.text
      console.log(path.resolve("uploads")); // /Personals/joe/uploads
      path.resolve("tmp", "joe.txt"); // '/Personals/joe/tmp/joe.txt' if run from my home folder

      return res.json(req.file.path);
    });
  }

  async createCitizen(req: Request, res: Response): Promise<any> {
    const body = req.body as ICreateDocumentWithCitizenRequestDto;

    try {
      const personal = await this.createDocumentCitizenService.execute(body);
      return this.ok(res, personal);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async create(req: Request, res: Response): Promise<any> {
    const body = req.body as ICreateDocumentServiceRequest;

    try {
      const personal = await this.createDocumentService.execute(body);
      return this.ok(res, personal);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAllMe(req: Request, res: Response): Promise<any> {
    const creatorId = (req as RequestUser).userId;
    try {
      const documents = await this.getAllDocumentMeService.execute({
        ...req.query,
        creatorId,
      });

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async findAll(req: Request, res: Response): Promise<any> {
    const personalId = (req as RequestUser).userId;
    try {
      const documents = await this.getAllDocumentService.execute({
        ...req.query,
        personalId,
      });

      return this.ok(res, documents);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }

  async update(req: Request, res: Response): Promise<any> {
    const body = req.body as IUpdateDocumentDto;
    const id = req.params.id as string;

    try {
      const document = await this.updateDocumentService.execute({
        ...body,
        id,
      });
      return this.ok(res, document);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
  async findOneById(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const document = await this.getDocumentDetailService.execute({ id });

      return this.ok(res, document);
    } catch (error) {
      if (error instanceof AppError) {
        if (error.status_code === 404) return this.notFound(res, error.message);
        return this.badRequest(res, error.message);
      }
    }
  }
  async removeOne(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      await this.removeOneDocumentService.execute({ id });

      return this.notContent(res);
    } catch (error) {
      if (error instanceof AppError) {
        return this.badRequest(res, error.message);
      }
    }
  }
}
