import { z } from "zod";
import { escapeRegex } from "../problem/helpers.schema";

export const ListUsersQuerySchema = z.object({
    page: z.coerce
      .number( "Page must be a number")
      .int()
      .min(1, "Page must be at least 1")
      .default(1),

    limit: z.coerce
      .number("Limit must be a number")
      .int()
      .min(1, "Limit must be at least 1")
      .max(100, "Limit must not exceed 100")
      .default(5),

    search: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? escapeRegex(val) : undefined)),

    sort : z
    .string()
    .trim()
    .optional(),

    isArchived : z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.toLowerCase() === "false") return false;
        if (val.toLowerCase() === "true") return true;
      }
      return val;
    },
    z.boolean('isArchived must be boolean').optional()
    ),

    isVerified : z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.toLowerCase() === "false") return false;
        if (val.toLowerCase() === "true") return true;
      }
      return val;
    },
    z.boolean('isVerified must be boolean').optional()
    ),

    authProvider: z
    .enum(["GOOGLE", "LOCAL"])
    .optional(),
})