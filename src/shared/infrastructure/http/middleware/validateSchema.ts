// src/middleware/validationMiddleware.ts
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { z, ZodError } from "zod";

type SchemaValidate = Partial<
  Record<
    keyof Pick<Request, "query" | "params" | "body">,
    z.ZodObject<any, any>
  >
>;

export function validateSchema(schema: SchemaValidate) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.query) schema.query.parse(req.query);
      if (schema.params) schema.params.parse(req.params);
      if (schema.body) schema.body.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));
        res
          .status(httpStatus.BAD_REQUEST)
          .json({ error: "Invalid data", details: errorMessages });
      } else {
        res
          .status(httpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
