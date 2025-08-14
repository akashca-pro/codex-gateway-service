import CountryCode from '@akashcapro/codex-shared-utils/enums/countryCode.enum'
import { z } from "zod";

export const StrictString = (fieldName: string = "Field") => z
    .string(`${fieldName} is required.`)
    .trim()
    .min(1,`${fieldName} cannot be empty.`)
    .regex(
        /^(?!.*['-]{2,})(?!.* {2,})(?!.*[.,]{2,})[a-zA-Z0-9 .,'-]+$/,
        `${fieldName} contains invalid characters or has consecutive spaces, punctuation, apostrophes, or hyphens.`
    );

export const CountrySchema = z
    .string()
    .trim()
    .length(3, 'Invalid country code')
    .transform((val) => val.toUpperCase())
    .refine((val)=> Object.values(CountryCode).includes(val as CountryCode),
    'Invalid country code');