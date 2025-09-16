import { z } from "zod";
import { codeSchema, LanguageSchemaEnum } from "../problem/helpers.schema";

export const runCodeExecParamSchema = z.object({
  problemId: z
    .string('Problem Id is required'),
  tempId : z
  .string().min(1,'tempId is required'),
})

export const runCodeExecSchema = z.object({
    tempId : z.string().min(1,'tempId is required'),
    userCode : codeSchema,
    language : LanguageSchemaEnum,
    testCases : z.array(z.object({
        Id : z.string(),
        input : z.string().min(1, "Test case input is required"),
        output : z.string().min(1, "Test case output is required"),
    }))
})