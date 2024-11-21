import { Request } from "express";

export type RequestUser = Request & { userId: string };
