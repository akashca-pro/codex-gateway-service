import { z } from 'zod'

export const userDashboardSchema = z.object({
    userTimezone : z
    .string('Timezone is required'),
})