
import {z} from "zod";
export const registerSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export const loginSchema = z.object({
    email: z.email('Invalid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});