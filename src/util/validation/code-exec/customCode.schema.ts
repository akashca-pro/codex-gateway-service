import { z } from "zod";
import { codeSchema, LanguageSchemaEnum } from "../problem/helpers.schema";

export const CustomCodeRunSchema = z.object({
    tempId : z.string().min(1,'tempId is required'),
    userCode : codeSchema,
    language : LanguageSchemaEnum
})