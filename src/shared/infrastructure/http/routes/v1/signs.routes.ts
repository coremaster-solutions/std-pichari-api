import { singsController } from "@/signatures/di";
import { Request, Response, Router } from "express";
import { uploadFileMulterTemp, validateSchema } from "../../middleware";
import {
  paramsIdSchema,
  signCreateResponseBodySchema,
  signLogUpdateBodySchema,
} from "../../schemas";

export class SignsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get("/get-token-peru", (req, res) =>
      singsController.getTokenSignPeru(req, res)
    );
    this.router.get("/get-reason-list", (req, res) =>
      singsController.getReasonListToSign(req, res)
    );
    this.router.get(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req: Request, res: Response) => singsController.getOneSignLog(req, res)
    );
    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: signLogUpdateBodySchema,
      }),
      (req: Request, res: Response) => singsController.updateSignLog(req, res)
    );

    this.router.post(
      "/create-response-peru",
      validateSchema({
        body: signCreateResponseBodySchema,
      }),
      (req, res) => singsController.createResponseSignPeru(req, res)
    );
    this.router.post(
      "/return-response-peru/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => singsController.returnResponseSignPeru(req, res)
    );

    this.router.post(
      "/upload-signed/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => singsController.uploadTemp(req, res)
    );

    return this.router;
  }
}
