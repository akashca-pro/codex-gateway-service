import { z } from "zod";
import { codeSchema, DifficultySchemaEnum, escapeRegex, ExampleSchema, LanguageSchemaEnum, NonEmpty, StarterCodeSchema, TestCaseCollectionTypeEnum, TestCaseSchema } from "./helpers.schema";
import { StrictString } from "../helper.schema";

export const checkQuestionIdQuerySchema = z.object({
    questionId : z
    .string('Question ID is required'),
})

export const checkTitleQuerySchema = z.object({
    title : z
    .string('Title is required'),
})

export const createProblemSchema = z.object({

    questionId : z
    .string('Question ID is required'),

    title : StrictString('Title')
    .min(3,'Title must be atleast 5 characters long')
    .max(100,'Title must not exceed 100 characters'),

    description : z.string()
    .trim()
    .min(20, 'Description must be at least 20 characters long')
    .max(2000,'Description must not exceed 2000 characters'),

    difficulty : DifficultySchemaEnum,

    tags: z
        .array(
             StrictString('Tag')
            .min(2, 'Tag must be at least 2 characters')
            .max(30, 'Tag must not exceed 30 characters')
        )
        .min(1, 'At least one tag is required" ')
        .max(5, 'You can specify up to 5 tags')
});

export const getProblemlistQuerySchema = z.object({
    title : StrictString('Title')
    .trim()
    .min(3,'Title must be atleast 5 characters long')
    .max(100,'Title must not exceed 100 characters')
    .optional(),

    questionId : StrictString('QuestionId')
    .optional(),

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

    difficulty: DifficultySchemaEnum.optional(),

    tags: z.array(z.string().trim())
    .optional()
    .default([]),

    active : z.preprocess(
    (val) => {
      if (typeof val === "string") {
        if (val.toLowerCase() === "false") return false;
        if (val.toLowerCase() === "true") return true;
      }
      return val;
    },
    z.boolean('Active must be boolean').optional()
    ),

    search: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val ? escapeRegex(val) : undefined)),

    sort : z
    .string()
    .trim()
    .optional()
})

export const UpdateBasicProblemDetailsSchema = z.object({
  questionId: StrictString('QuestionId').optional(),

  title: StrictString('Title').optional(),

  description: z.string('Description')
  .min(20, "Description must be at least 20 characters")
  .max(2000, "Description must not exceed 2000 characters")
  .optional(),

  difficulty: DifficultySchemaEnum.optional(),

  active: z.boolean().optional(),

  tags: z.array(StrictString('Tags').min(1).max(20))
  .nonempty("At least one tag is required")
  .optional()
  .default([]),

  constraints: z.array(NonEmpty)
  .optional()
  .default([]),

  examples: z.array(ExampleSchema)
  .optional()
  .default([]),

  starterCodes: z.array(StarterCodeSchema)
  .optional()
  .default([])
});   

export const AddTestCaseSchema = z.object({
  testCaseCollectionType: TestCaseCollectionTypeEnum,
  testCase: TestCaseSchema
});

export const BulkUploadTestCasesSchema = z.object({
  testCaseCollectionType: TestCaseCollectionTypeEnum,
  testCase: z.array(TestCaseSchema).nonempty("At least one test case is required")
});

export const RemoveTestCaseParamSchema = z.object({
  problemId: NonEmpty.min(1,'ProblemId is required'),
  testCaseId: NonEmpty.min(1,'Test caseId is required'),
});

export const RemoveTestCaseQuerySchema = z.object({
  testCaseCollectionType: TestCaseCollectionTypeEnum
})

export const AddSolutionCodeSchema = z.object({
  language: LanguageSchemaEnum,
  code: codeSchema,
  executionTime: z.coerce.number('Execution time required'),
  memoryTaken: z.coerce.number('MemoryTaken required')
});

export const UpdateSolutionCodeSchema = z.object({
  language : LanguageSchemaEnum.optional(),
  code : codeSchema.optional(),
  executionTime: z.coerce.number('Execution time required').optional(),
  memoryTaken: z.coerce.number('MemoryTaken required').optional()
});

export const RemoveSolutionCodeSchema = z.object({
  solutionCodeId: NonEmpty.min(1,'Solution code id is required'),
});

export const ProblemIdParamsSchema = z.object({
  problemId: z
    .string('Problem Id is required')
});

export const SubmitResultParamsSchema = z.object({
  problemId: z
    .string('Problem id is required'),
  submissionId : z
    .string('Submission id is required')
})

export const SolutionCodeParamsSchema = z.object({
  problemId: z
    .string('Problem Id is required'),
  solutionCodeId : z
    .string('Solution Id is required')
})

export const TemplateCodeParamsSchema = z.object({
  problemId: z
    .string('Problem Id is required'),
  templateCodeId : z
    .string('TemplateCode Id is required'),
})

export const UpdateTemplateCodeSchema = z.object({
    language : LanguageSchemaEnum.optional(),
    submitWrapperCode : z.string().optional(),
    runWrapperCode : z.string().optional(),
})

export const ListProblemSpecificsubmissionsSchemaQuery = z.object({
    limit: z.coerce
      .number("Limit must be a number")
      .int()
      .min(1, "Limit must be at least 1")
      .max(100, "Limit must not exceed 100")
      .default(5),
    nextCursor : z.string().optional()
})