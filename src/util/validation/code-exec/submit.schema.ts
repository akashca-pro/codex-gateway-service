import { z } from "zod";
import { CountrySchema } from "../helper.schema";
import { codeSchema, LanguageSchemaEnum } from "../problem/helpers.schema";

export const submitCodeExecSchema = z.object({
    userId : z.string().min(1,'User Id is required'),
    country : CountrySchema.optional(),
    userCode : codeSchema,
    language : LanguageSchemaEnum
})