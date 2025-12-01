import { CountryCode, CountryNameToCode, isValidCountry } from '@akashcapro/codex-shared-utils/dist/enums/countryCode.enum'
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
  .transform((val) => {
    const upper = val.toUpperCase();

    if (isValidCountry(upper)) {
      return upper as CountryCode;
    }

    const code = CountryNameToCode[val.toLowerCase()];
    if (code) {
      return code;
    }

    return val;
  })
  .refine(
    (val) => isValidCountry(val),
    "Invalid country code"
  );