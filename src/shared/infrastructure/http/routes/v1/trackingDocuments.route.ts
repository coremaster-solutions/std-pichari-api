import { Router } from "express";
import { validateSchema } from "../../middleware";
import { paramsIdSchema } from "../../schemas";
import { trackingDocumentsController } from "@/tracking_documents/di";

export class TrackingDocumentsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => trackingDocumentsController.findOneById(req, res)
    );

    return this.router;
  }
}
