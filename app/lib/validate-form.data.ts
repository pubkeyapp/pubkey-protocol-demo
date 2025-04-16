import { ZodSchema, z } from 'zod'

export function validateFormData(formData: FormData, schema: ZodSchema): z.infer<typeof schema> {
  const { data, error, success } = schema.safeParse(Object.fromEntries(formData.entries()))
  if (!success) {
    console.error('Invalid form data:', error)
    throw new Error('Invalid form data')
  }
  return data
}
