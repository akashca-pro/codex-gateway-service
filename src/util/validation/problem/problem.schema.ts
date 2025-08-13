import { z } from "zod";
import { DifficultySchemaEnum, ExampleSchema, NonEmpty, SolutionCodeSchema, StarterCodeSchema, TestCaseCollectionTypeEnum, TestCaseSchema } from "./helpers.schema";

export const createProblemSchema = z.object({

    questionId : z
    .string('Question ID is required'),

    title : z
    .string('Title is required')
    .trim()
    .min(3,'Title must be atleast 5 characters long')
    .max(100,'Title must not exceed 100 characters'),

    description : z
    .string('Description is required')
    .trim()
    .min(20, 'Description must be at least 20 characters long')
    .max(2000,'Description must not exceed 2000 characters'),

    difficulty : DifficultySchemaEnum,

    tags: z
        .array(
            z
            .string('Tag cannot be empty')
            .min(2, 'Tag must be at least 2 characters')
            .max(30, 'Tag must not exceed 30 characters')
        )
        .min(1, 'At least one tag is required" ')
        .max(5, 'You can specify up to 5 tags')
});

export const getProblemSchema = z.object({
    title : z
    .string()
    .trim()
    .min(3,'Title must be atleast 5 characters long')
    .max(100,'Title must not exceed 100 characters')
    .optional(),

    questionId : z
    .string()
    .optional(),
})

export const listProblemRequest = z.object({
    page : z
    .number('Page is required')
    .int("Page must be an integer")
    .min(1, "Page must be greater than or equal to 1"),

    limit : z
    .number('Limit is required')
    .int("Limit must be an integer")
    .min(1, "Limit must be greater than or equal to 1")
    .max(100, "Limit must not exceed 100"),

    difficulty: DifficultySchemaEnum.optional(),

    tag: z
      .string("Tag must be a string")
      .trim()
      .min(2, "Tag must be at least 2 characters long")
      .max(30, "Tag must not exceed 10 characters")
      .optional(),

    active: z.boolean("Active must be a boolean").optional(),

    search: z
      .string("Search must be a string")
      .trim()
      .min(1, "Search must be at least 1 character long")
      .max(100, "Search must not exceed 100 characters")
      .optional(),
    
    questionId: z
      .string("Question ID must be a string")
      .optional(),
})

export const UpdateBasicProblemDetailsSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  questionId: NonEmpty.optional(),
  title: NonEmpty.optional(),
  description: NonEmpty
  .min(20, "Description must be at least 20 characters")
  .max(2000, "Description must not exceed 2000 characters")
  .optional(),
  difficulty: DifficultySchemaEnum.optional(),
  active: z.boolean().optional(),
  tags: z.array(NonEmpty).nonempty("At least one tag is required").optional(),
  constraints: z.array(NonEmpty).optional(),
  examples: z.array(ExampleSchema).optional(),
  starterCodes: z.array(StarterCodeSchema).optional()
});   

export const AddTestCaseSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  testCaseCollectionType: TestCaseCollectionTypeEnum,
  testCase: TestCaseSchema
});

export const BulkUploadTestCasesSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  testCaseCollectionType: TestCaseCollectionTypeEnum,
  testCase: z.array(TestCaseSchema).nonempty("At least one test case is required")
});

export const RemoveTestCaseSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  testCaseId: NonEmpty.min(1,'Test caseId is required'),
  testCaseCollectionType: TestCaseCollectionTypeEnum
});

export const AddSolutionCodeSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  solutionCode: SolutionCodeSchema
});

export const UpdateSolutionCodeSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  solutionCodeId: NonEmpty.min(1,'Solution code id is required'),
  solutionCode: SolutionCodeSchema
});

export const RemoveSolutionCodeSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  solutionCodeId: NonEmpty.min(1,'Solution code id is required'),
});