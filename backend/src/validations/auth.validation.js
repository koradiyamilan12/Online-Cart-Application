const { z } = require("zod");

const isWithinBcryptLimit = (value) => Buffer.byteLength(value, "utf8") <= 72;

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .refine(isWithinBcryptLimit, {
    message: "Password must not exceed 72 bytes",
  })
  .refine(
    (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/.test(value),
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  );

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(255, "Email must not exceed 255 characters")
    .email("Please enter a valid email address"),
  password: passwordSchema,
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(255, "Email must not exceed 255 characters")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .refine(isWithinBcryptLimit, {
      message: "Password must not exceed 72 bytes",
    }),
});

module.exports = {
  registerSchema,
  loginSchema,
};
