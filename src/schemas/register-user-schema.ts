import z from "zod";

const PasswordSchema = z
  .string("Please enter a valid password")
  .min(7, "Password must be at least 7 characters long")
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "Password must contain at least one number",
  })
  .refine((password) => /[!@#$%^&*()_+=\[{\]};:<>|./?]/.test(password), {
    message: "Password must contain at least one special character",
  });

export const RegisterUserSchema = z
  .object({
    email: z.email("Invalid email"),
    username: z
      .string("Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot be greater than 30 characters"),
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((fields) => fields.password === fields.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
