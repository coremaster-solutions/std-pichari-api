import { personalOfficesController } from "@/personals_offices/di";
import { Request, Response, Router } from "express";
import { isAuthenticate, validateSchema } from "../../middleware";
import {
  paramsIdSchema,
  personalOfficeDelegateBodySchema,
  personalOfficeGetAllOfficesByPersonalQuerySchema,
  personalOfficeLeaveBodySchema,
  personalOfficeReturnDelegateBodySchema,
} from "../../schemas";

export class PersonalOfficesRoute {
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
          query: personalOfficeGetAllOfficesByPersonalQuerySchema,
        }),
      ],
      (req: Request, res: Response) =>
        personalOfficesController.getOfficesByUser(req, res)
    );

    this.router.get(
      "/get-delegate-by-previous-personal/:id",
      [
        isAuthenticate,
        validateSchema({
          params: paramsIdSchema,
        }),
      ],
      (req: Request, res: Response) =>
        personalOfficesController.getOfficeDelegateByPreviousPersonalId(
          req,
          res
        )
    );

    this.router.post(
      "/leave",
      [
        isAuthenticate,
        validateSchema({
          body: personalOfficeLeaveBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        personalOfficesController.leavePersonalOffice(req, res)
    );

    this.router.post(
      "/delegate",
      [
        isAuthenticate,
        validateSchema({
          body: personalOfficeDelegateBodySchema,
        }),
      ],
      (req: Request, res: Response) =>
        personalOfficesController.delegateOfficeToPersonal(req, res)
    );

    this.router.delete(
      "/:id",
      [
        isAuthenticate,
        validateSchema({
          params: paramsIdSchema,
        }),
      ],
      (req: Request, res: Response) =>
        personalOfficesController.deletePersonalOfficeById(req, res)
    );

    this.router.put(
      "/cancel-leave/:id",
      [
        isAuthenticate,
        validateSchema({
          params: paramsIdSchema,
        }),
      ],
      (req: Request, res: Response) =>
        personalOfficesController.returnOfficeToPersonal(req, res)
    );

    return this.router;
  }
}
