import z from "zod"
import { CountrySchema } from "../helper.schema"

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .regex(/^[a-zA-Z]+$/, 'First name must contain only letters'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .regex(/^[a-zA-Z]+$/, 'Last name must contain only letters')
    .optional(),

  country: CountrySchema,

  preferredLanguage : z
    .string()
    .min(2, 'Preferred language field must be at least 2 characters')
    .max(15)

})