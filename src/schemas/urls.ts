import z from "zod";

export const NewUrlSchema = z.object({
  url: z
    .string()
    .regex(
      /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
      "Please enter a valid URL",
    ),
});
