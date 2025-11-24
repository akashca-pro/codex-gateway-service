import { z } from "zod";

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export enum TestCaseCollectionType {
    RUN = "run",
    SUBMIT = "submit"
}

export enum Language {
    JAVASCRIPT = 'javascript',
    PYTHON = 'python',
    GO = 'go',
}

const testCaseCollectionTypeMap : Record<TestCaseCollectionType, number> = {
    [TestCaseCollectionType.RUN] : 1,
    [TestCaseCollectionType.SUBMIT] : 2,
};

const difficultyCodeMap: Record<Difficulty, number> = {
  [Difficulty.EASY]: 1,
  [Difficulty.MEDIUM]: 2,
  [Difficulty.HARD]: 3
};

const languageMap : Record<Language,number> = {
    [Language.JAVASCRIPT] : 1,
    [Language.PYTHON] : 2,
    [Language.GO] : 3,
}

export function escapeRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export const NonEmpty = z.string().trim().min(1, "Value cannot be empty");

// difficulty enum
export const DifficultySchemaEnum = z
  .string('Difficulty is required')
  .transform((val) => val.toLowerCase().trim()) // normalize case/space
  .refine((val) => Object.values(Difficulty).includes(val as Difficulty),
    'Invalid difficulty value')
  .transform((val) => difficultyCodeMap[val as Difficulty]);

// language enum
export const LanguageSchemaEnum = z
  .string('Language is required')
  .transform((val) => val.toLowerCase().trim())
  .refine((val) => Object.values(Language).includes(val as Language), 
    'Invalid language value')
  .transform((val) => languageMap[val as Language]);

// test case collection type enum
export const TestCaseCollectionTypeEnum = z
  .string('Testcase collection type is required')
  .transform((val)=>val.toLowerCase().trim())
  .refine((val)=> Object.values(TestCaseCollectionType).includes(val as TestCaseCollectionType),
  'Invalid test case collection type')
  .transform((val)=> testCaseCollectionTypeMap[val as TestCaseCollectionType]);

// TestCase
export const TestCaseSchema = z.object({
  input: NonEmpty.min(1, "Test case input is required"),
  output: NonEmpty.min(1, "Test case output is required")
});

// Example
export const ExampleSchema = z.object({
  input: NonEmpty.min(1,'Input is required'),
  output: NonEmpty.min(1,'Output is required')
});

// StarterCode
export const StarterCodeSchema = z.object({
  language: LanguageSchemaEnum,
  code: NonEmpty
});

export const SolutionRoadmapSchema = z.object({
  level: z.number().min(1, "Level must be at least 1"),
  description: z.string().trim().min(5, "Description must be at least 5 characters"),
});

// code field in solution code
export const codeSchema = z
  .string( "Code field is required" )
  .min(1, "Code field cannot be empty")
  .max(10000, "Code exceeds maximum allowed length (10,000 characters)")

