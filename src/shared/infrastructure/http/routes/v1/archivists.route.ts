import { Request, Response, Router } from "express";
import { isAuthenticate, validateSchema } from "../../middleware";
import {
  paramsIdSchema,
  archivistCreateBodySchema,
  archivistUpdateBodySchema,
} from "../../schemas";
import { archivistsController } from "@/archivists/di";

export class ArchivistsRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get("/", (req, res) => archivistsController.findAll(req, res));
    this.router.post(
      "/",
      [
        isAuthenticate,
        validateSchema({
          body: archivistCreateBodySchema,
        }),
      ],
      (req: Request, res: Response) => archivistsController.create(req, res)
    );

    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: archivistUpdateBodySchema,
      }),
      (req, res) => archivistsController.update(req, res)
    );

    this.router.get(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => archivistsController.findOneById(req, res)
    );

    this.router.delete(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => archivistsController.removeOne(req, res)
    );

    return this.router;
  }
}
