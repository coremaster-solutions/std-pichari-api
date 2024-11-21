import { groupsController } from "@/groups/di";
import { Request, Response, Router } from "express";
import { isAuthenticate, validateSchema } from "../../middleware";
import {
  groupCreateBodySchema,
  groupGetAllQuerySchema,
  groupGetAllSimpleQuerySchema,
  groupUpdateBodySchema,
  paramsIdSchema,
} from "../../schemas";

export class GroupsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get(
      "/",
      [
        isAuthenticate,
        validateSchema({
          query: groupGetAllQuerySchema,
        }),
      ],
      (req: Request, res: Response) => groupsController.findAll(req, res)
    );
    this.router.post(
      "/",
      [
        isAuthenticate,
        validateSchema({
          body: groupCreateBodySchema,
        }),
      ],
      (req: Request, res: Response) => groupsController.create(req, res)
    );

    this.router.get(
      "/simple",
      [
        isAuthenticate,
        validateSchema({
          query: groupGetAllSimpleQuerySchema,
        }),
      ],
      (req: Request, res: Response) => groupsController.findAllSimple(req, res)
    );

    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: groupUpdateBodySchema,
      }),
      (req: Request, res: Response) => groupsController.update(req, res)
    );

    this.router.get(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req: Request, res: Response) => groupsController.findOneById(req, res)
    );

    this.router.delete(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req: Request, res: Response) => groupsController.removeOne(req, res)
    );

    return this.router;
  }
}
