import { z } from "zod";

export const personalOfficeDelegateBodySchema = z.object({
  currentPersonalId: z.string().uuid(),
  personalIdToDelegate: z.string().uuid(),
});

export const personalOfficeGetAllOfficesByPersonalQuerySchema = z.object({
  personalId: z.string().uuid().optional(),
});

export const personalOfficeReturnDelegateBodySchema = z.object({
  currentPersonalId: z.string().uuid(),
  personalIdToReturn: z.string().uuid(),
});

export const personalOfficeLeaveBodySchema = z.object({
  currentPersonalId: z.string().uuid(),
  personalIdToLeave: z.string().uuid(),
});
