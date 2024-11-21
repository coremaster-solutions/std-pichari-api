import { Request, Response, Router } from "express";
import { isAuthenticate, validateSchema } from "../../middleware";
import {
  paramsIdSchema,
  documentTypeCreateBodySchema,
  documentTypeUpdateBodySchema,
  categoryGetAllQuerySchema,
} from "../../schemas";
import { documentTypesController } from "@/document_types/di";

export class DocumentTypesRoute {
  private router: Router;

  constructor() {
    this.router = Router();
  }

  register() {
    this.router.get(
      "/",
      [
        validateSchema({
          query: categoryGetAllQuerySchema,
        }),
      ],
      (req: Request, res: Response) => documentTypesController.findAll(req, res)
    );
    this.router.post(
      "/",
      [
        isAuthenticate,
        validateSchema({
          body: documentTypeCreateBodySchema,
        }),
      ],
      (req: Request, res: Response) => documentTypesController.create(req, res)
    );

    this.router.put(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
        body: documentTypeUpdateBodySchema,
      }),
      (req, res) => documentTypesController.update(req, res)
    );

    this.router.get(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => documentTypesController.findOneById(req, res)
    );

    this.router.delete(
      "/:id",
      validateSchema({
        params: paramsIdSchema,
      }),
      (req, res) => documentTypesController.removeOne(req, res)
    );

    return this.router;
  }
}
