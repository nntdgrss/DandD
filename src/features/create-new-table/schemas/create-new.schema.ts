import { z } from "zod";

export const createNewTableSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, {
      message: "Name must be at least 1 character long",
    })
    .max(20, {
      message: "Name must be less than 20 characters long",
    }),
});

export type CreateNewTableSchema = z.infer<typeof createNewTableSchema>;
