import { EnumStatusSignLog } from "@/signatures/domain/enum";
import { z } from "zod";

export const signCreateResponseBodySchema = z.object({
  documentUrl: z.string().url(),
  positionPersonal: z.string(),
  signatureReason: z.string().min(5),
  stampUrl: z.string().url().optional(),
  signatureStyle: z.number().min(1).max(4).optional(),
});

export const signLogUpdateBodySchema = z.object({
  status: z.nativeEnum(EnumStatusSignLog).optional(),
  documentUrl: z.string().optional(),
});
