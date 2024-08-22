import {z} from 'zod'

export const emailSchema = z.string().email("Invalid email")
export const passwordSchema = z.string()
.min(8, "Password must be at least 8 characters")
export const fullNameSchema = z.string().min(3, "Full name must be at least 3 characters")
export const phoneNumberSchema = z.string().min(10, "Phone number must be at least 10 characters")

