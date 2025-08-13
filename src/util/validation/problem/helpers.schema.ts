import { z } from "zod";

enum Difficult {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

enum TestCaseCollectionType {
    RUN = "run",
    SUBMIT = "submit"
}

export enum Language {
    JAVASCRIPT = 'javascript',
    PYTHON = 'python',
}

const testCaseCollectionTypeMap : Record<TestCaseCollectionType, number> = {
    [TestCaseCollectionType.RUN] : 1,
    [TestCaseCollectionType.SUBMIT] : 2,
};

const difficultyCodeMap: Record<Difficult, number> = {
  [Difficult.EASY]: 1,
  [Difficult.MEDIUM]: 2,
  [Difficult.HARD]: 3
};

const languageMap : Record<Language,number> = {
    [Language.JAVASCRIPT] : 1,
    [Language.PYTHON] : 2
}


export const NonEmpty = z.string().trim().min(1, "Value cannot be empty");

// difficulty enum
export const DifficultySchemaEnum = z
  .string('Difficulty is required')
  .transform((val) => val.toLowerCase().trim()) // normalize case/space
  .refine((val) => Object.values(Difficult).includes(val as Difficult),
    'Invalid difficulty value')
  .transform((val) => difficultyCodeMap[val as Difficult]);

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
  Id: NonEmpty.min(1,'Id is required'),
  input: NonEmpty.min(1, "Test case input is required"),
  output: NonEmpty.min(1, "Test case output is required")
});

// Example
export const ExampleSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  input: NonEmpty.min(1,'Input is required'),
  output: NonEmpty.min(1,'Output is required'),
  explanation: NonEmpty.min(1,'Explanation is required'),
});

// StarterCode
export const StarterCodeSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  language: NonEmpty, // Could be normalized like Difficulty
  code: NonEmpty
});

// SolutionCode
export const SolutionCodeSchema = z.object({
  Id: NonEmpty.min(1,'Id is required'),
  language: NonEmpty, // normalizeEnum(Language) if enum
  code: NonEmpty.min(1,'Code is required'),
  executionTime: z.coerce.number().min(0, "Execution time must be >= 0"),
  memoryTaken: z.coerce.number().min(0, "Memory taken must be >= 0")
});
