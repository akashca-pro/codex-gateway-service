import { z } from "zod";
import { codeSchema, LanguageSchemaEnum } from "../problem/helpers.schema";

export const runCodeExecSchema = z.object({
    userId : z.string(),
    userCode : codeSchema,
    language : LanguageSchemaEnum,
    testCases : z.array(z.object({
        Id : z.string(),
        input : z.string().min(1, "Test case input is required"),
        output : z.string().min(1, "Test case output is required"),
    }))
})