import { z } from "zod";
import { codeSchema, LanguageSchemaEnum } from "../problem/helpers.schema";

export const CustomCodeRunSchema = z.object({
    userCode : codeSchema,
    language : LanguageSchemaEnum
})

export const TempIdParamSchema = z.object({
    tempId : z.string().min(1,'tempId is required'),
})