import { z } from "zod";
import { CountrySchema } from "../helper.schema";
import { codeSchema, LanguageSchemaEnum } from "../problem/helpers.schema";

export const submitCodeExecSchema = z.object({
    country : CountrySchema.optional(),
    userCode : codeSchema,
    language : LanguageSchemaEnum
})

export const submitCodeResultSchema = z.object({
    submissionId : z
    .string().min(1,'submissionId is required'),
})