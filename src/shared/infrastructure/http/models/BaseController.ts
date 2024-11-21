import { Response } from "express";
import httpStatus from "http-status";

export class BaseController {
  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T) {
    if (dto) {
      res.type("application/json");
      return res.status(httpStatus.OK).json(dto);
    }
    return res.sendStatus(httpStatus.OK);
  }

  public created(res: Response) {
    return res.sendStatus(httpStatus.CREATED);
  }

  public notContent(res: Response) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  public clientError(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      httpStatus.BAD_REQUEST,
      message ? message : "Unauthorized"
    );
  }

  public unauthorized(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      httpStatus.UNAUTHORIZED,
      message ? message : "Unauthorized"
    );
  }

  public paymentRequired(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      httpStatus.PAYMENT_REQUIRED,
      message ? message : "Payment Required"
    );
  }

  public forbidden(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      httpStatus.FORBIDDEN,
      message ? message : "Forbidden"
    );
  }

  public notFound(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      httpStatus.NOT_FOUND,
      message ? message : "Not Found"
    );
  }

  public conflict(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      httpStatus.CONFLICT,
      message ? message : "Conflict"
    );
  }

  public tooMany(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      httpStatus.TOO_MANY_REQUESTS,
      message ? message : "Too Many Requests"
    );
  }

  public badRequest(res: Response, message?: string) {
    return BaseController.jsonResponse(
      res,
      httpStatus.BAD_REQUEST,
      message ?? "BAD_REQUEST"
    );
  }

  public fail(res: Response, error: Error | string) {
    console.log(error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.toString(),
    });
  }
}
