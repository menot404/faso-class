import { z } from 'zod'

export const studentSchema = z.object({
  firstName: z.string().min(1, 'Prénom requis'),
  lastName: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  birthDate: z.string().optional(),
  grade: z.number().int().min(0).optional(),
  class: z.string().optional(),
  address: z.string().optional(),
})

export type StudentFormValues = z.infer<typeof studentSchema>