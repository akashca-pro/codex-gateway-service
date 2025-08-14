import { z } from "zod";

/**
 * A reusable Zod schema for a string that must not be empty and must
 * only contain allowed characters (letters, numbers, spaces, and common punctuation).
 */
export const StrictString = (fieldName: string = "Field") => z
    .string(`${fieldName} is required.`)
    .trim()
    .min(1,`${fieldName} cannot be empty.`)
    .regex(
        /^(?!.*['-]{2,})(?!.* {2,})(?!.*[.,]{2,})[a-zA-Z0-9 .,'-]+$/,
        `${fieldName} contains invalid characters or has consecutive spaces, punctuation, apostrophes, or hyphens.`
    );