import { officeGroupsController } from "@/office_groups/di";
import { Request, Response, Router } from "express";
import { isAuthenticate, validateSchema } from "../../middleware";
import {
  officeGroupCreateBodySchema,
  officeGroupGetByOfficeAndPersonalQuerySchema,
  officeGroupUpdateBodySchema,
  paramsIdSchema,
} from "../../schemas";

export class OfficeGroupsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get(
      "/group",
      [
        isAuthenticate,
        validateSchema({
          query: officeGroupGetByOfficeAndPersonalQuerySchema,
        }),
      ],
      (req: Request, res: Response) =>
        officeGroupsController.getGroupByPersonalAndOffice(req, res)
    );
    this.router.post(
      "/",
      [
        isAuthenticate,
        validateSchema({
          body: officeGroupCreateBodySchema,
        }),
      ],
      (req: Request, res: Response) => officeGroupsController.create(req, res)
    );

    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: officeGroupUpdateBodySchema,
      }),
      (req: Request, res: Response) => officeGroupsController.update(req, res)
    );

    return this.router;
  }
}
