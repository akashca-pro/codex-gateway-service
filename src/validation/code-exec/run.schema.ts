import { z } from "zod";
import { codeSchema, LanguageSchemaEnum } from "../problem/helpers.schema";

const safeTestCaseString = z.string().refine((val) => {
  // Try parsing as JSON first
  try {
    const parsed = JSON.parse(val);

    // If it's an array, ensure each element is a string or number
    if (Array.isArray(parsed)) {
      return parsed.every(
        (el) => typeof el === "number" || typeof el === "string"
      );
    }

    // Otherwise, it should be a single number or string
    return typeof parsed === "number" || typeof parsed === "string";
  } catch {
    // If JSON.parse fails, maybe it's a plain number or single character
    return /^-?\d+(\.\d+)?$/.test(val) || /^.$/.test(val);
  }
}, {
  message: "Input must be a number, character, or JSON array of numbers/strings",
});


export const runCodeExecParamSchema = z.object({
  problemId: z
    .string('Problem Id is required'),
})

export const runCodeResultParamSchema = z.object({
  tempId : z
    .string('TempId is required')
})

export const runCodeExecSchema = z.object({
    userCode : codeSchema,
    language : LanguageSchemaEnum,
    testCases: z.array(
      z.object({
        Id: z.string(),
        input: z.string(),
        output: z.string(),
      })
  ),
})