import { Request, Response, Router } from "express";
import { isAuthenticate, validateSchema } from "../../middleware";
import { paramsIdSchema, notificationUpdateBodySchema } from "../../schemas";
import { notificationsController } from "@/notifications/di";

export class NotificationsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get("/", [isAuthenticate], (req: Request, res: Response) =>
      notificationsController.findAll(req, res)
    );

    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: notificationUpdateBodySchema,
      }),
      (req, res) => notificationsController.update(req, res)
    );

    return this.router;
  }
}
