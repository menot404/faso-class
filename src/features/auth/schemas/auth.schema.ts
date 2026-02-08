
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'validation.email' }),
  password: z.string().min(6, { message: 'validation.minLength' }),
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z.object({
  firstName: z.string().min(2, { message: 'validation.minLength' }),
  lastName: z.string().min(2, { message: 'validation.minLength' }),
  email: z.string().email({ message: 'validation.email' }),
  password: z.string().min(8, { message: 'validation.minLength' }),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  role: z.enum(['admin', 'teacher', 'parent']),
  schoolName: z.string().min(3, { message: 'validation.minLength' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'validation.passwordMatch',
  path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;