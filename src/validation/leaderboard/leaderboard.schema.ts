import { z } from "zod";
import { CountrySchema } from "../helper.schema";

export const globalLeaderboardSchema = z.object({
    k : z.coerce
     .number('K must be a number')
     .int()
     .min(2,'K must be at least 2')
     .default(10)
})

export const countryLeaderboardSchema = z.object({
    country : CountrySchema,
    k : z.coerce
     .number('K must be a number')
     .int()
     .min(2,'K must be at least 2')
     .default(10)
})  