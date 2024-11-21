import {
  ISendEmailShareDocumentService,
  ISendEmailStatusProcedureServiceRequest,
  ISendWhatsAppStatusProcedureServiceRequest,
  ISendWhatsAppStatusProcedureToPersonalService,
  SendEmailCreateProcedureService,
  SendEmailShareDocumentService,
  SendEmailStatusProcedureService,
  SendWhatsAppCreateProcedureService,
  SendWhatsAppStatusProcedureService,
  SendWhatsAppStatusProcedureToPersonalService,
} from "@/documents/application/v1";
import { DocumentModel } from "@/documents/domain/models";
import { Envs } from "@/shared/config";
import { cleanTempDirectoryFilesService } from "@/shared/di";
import { createBullBoard } from "@bull-board/api";
import { BullAdapter } from "@bull-board/api/bullAdapter";
import { ExpressAdapter } from "@bull-board/express";
import Bull, { Queue } from "bull";
import { emailProvider, whatsAppProvider } from "..";
import { IJobsProvider, JobsData } from "../models";
import {
  ISendEmailForgotPasswordServiceRequest,
  SendEmailForgotPasswordService,
} from "@/personals/application/v1";

export class JobsProvider implements IJobsProvider {
  private queue: Queue;
  private serverAdapterBull: ExpressAdapter;

  constructor() {
    this.queue = new Bull("queueDocumentary", {
      redis: {
        port: Number(Envs.REDIS_PORT),
        host: Envs.REDIS_HOST,
      },
    });
    this.serverAdapterBull = new ExpressAdapter();
    this.serverAdapterBull.setBasePath("/admin/queues");
    createBullBoard({
      queues: [new BullAdapter(this.queue)],
      serverAdapter: this.serverAdapterBull,
    });
    console.log("Worker started");
  }

  adapterRoute() {
    return this.serverAdapterBull.getRouter();
  }

  process() {
    this.queue.process(async (job) => {
      const data = job.data as JobsData<Record<string, any>>;
      switch (data.type) {
        case "send_email_status_procedure":
          const sendEmailStatusProcedureService =
            new SendEmailStatusProcedureService(emailProvider);
          await sendEmailStatusProcedureService.execute(
            data.data as ISendEmailStatusProcedureServiceRequest
          );

          break;
        case "forgot_password":
          const sendEmailForgotPasswordService =
            new SendEmailForgotPasswordService(emailProvider);
          await sendEmailForgotPasswordService.execute(
            data.data as ISendEmailForgotPasswordServiceRequest
          );
          break;

        case "send_email_citizen_procedure":
          const sendEmailCreateProcedureService =
            new SendEmailCreateProcedureService(emailProvider);
          await sendEmailCreateProcedureService.execute({
            data: data.data as DocumentModel,
          });

          break;

        case "send_whatsapp_create_procedure":
          const sendWhatsAppCreateProcedureService =
            new SendWhatsAppCreateProcedureService(whatsAppProvider);
          await sendWhatsAppCreateProcedureService.execute({
            procedure: data.data as DocumentModel,
          });
          break;

        case "send_whatsapp_status_procedure":
          const sendWhatsAppStatusProcedureService =
            new SendWhatsAppStatusProcedureService(whatsAppProvider);
          await sendWhatsAppStatusProcedureService.execute(
            data.data as ISendWhatsAppStatusProcedureServiceRequest
          );
          break;
        case "clean_temp_directory":
          cleanTempDirectoryFilesService.execute();

          break;

        case "send_whatsapp_status_procedure_to_personal":
          const sendWhatsAppStatusProcedureToPersonalService =
            new SendWhatsAppStatusProcedureToPersonalService(whatsAppProvider);
          await sendWhatsAppStatusProcedureToPersonalService.execute(
            data.data as ISendWhatsAppStatusProcedureToPersonalService
          );
          break;
        case "send_email_share_document":
          const sendEmailShareDocumentService =
            new SendEmailShareDocumentService(emailProvider);
          await sendEmailShareDocumentService.execute(
            data.data as ISendEmailShareDocumentService
          );
          break;
      }
    });
    this.queue.on("active", (data: JobsData<Record<string, any>>) =>
      console.log(`Job active::`, data.type)
    );
    this.queue.on("progress", (data: JobsData<Record<string, any>>) => {
      console.log(`Job progress::`, data.type);
    });
    this.queue.on("completed", (data: JobsData<Record<string, any>>) =>
      console.log(`Job completed::`, data.type)
    );
  }

  add<T>(data: JobsData<T>) {
    this.queue.add(data);
  }
}
