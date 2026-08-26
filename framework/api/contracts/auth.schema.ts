import { z } from 'zod';

export const loginResponseSchema = z
  .object({
    authentication: z
      .object({
        token: z.string().min(1),

        bid: z.union([
          z.number(),
          z.string(),
        ]),
      })
      .passthrough(),
  })
  .passthrough();