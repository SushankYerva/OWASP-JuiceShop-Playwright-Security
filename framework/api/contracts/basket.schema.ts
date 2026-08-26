import { z } from 'zod';

export const basketProductSchema = z
  .object({
    id: z.number(),
    name: z.string().min(1),
    price: z.number(),
  })
  .passthrough();

export const basketSchema = z
  .object({
    id: z.number(),

    Products: z.array(
      basketProductSchema,
    ),
  })
  .passthrough();

export const basketResponseSchema = z
  .object({
    status: z.string(),
    data: basketSchema,
  })
  .passthrough();