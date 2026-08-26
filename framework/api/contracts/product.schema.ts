import { z } from 'zod';

export const productSchema = z
  .object({
    id: z.number(),
    name: z.string().min(1),
    price: z.number().nonnegative(),
  })
  .passthrough();

export const productListResponseSchema = z
  .object({
    status: z.string(),
    data: z.array(productSchema),
  })
  .passthrough();