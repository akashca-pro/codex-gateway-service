import {  z } from 'zod';

// Auth

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .regex(/^[a-zA-Z]+$/, 'First name must contain only letters'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .regex(/^[a-zA-Z]+$/, 'Last name must contain only letters')
    .optional(),

  email: z
    .email('Invalid email address')
    .min(5)
    .max(255),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&#]/, 'Password must contain at least one special character'),

  country: z
    .string()
    .min(3, 'Country name must be at least 3 characters')
    .max(20)
});

export const resendOtpSchema = z.object({
    email : z
    .email('Invalid email address')
    .min(5)
    .max(255),
})

export const verifyOtpSchema = z.object({
    email : z
    .email('Invalid email address')
    .min(5)
    .max(255),

  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
})

export const userLoginSchema = z.object({
    email : z
    .email('Invalid email address')
    .min(5)
    .max(255),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&#]/, 'Password must contain at least one special character'),
})

export const forgotPasswordSchema = z.object({
    email : z
    .email('Invalid email address')
    .min(5)
    .max(255),
})

export const resetPasswordSchema = z.object({
    email : z
    .email('Invalid email address')
    .min(5)
    .max(255),

    Password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100)
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[@$!%*?&#]/, 'Password must contain at least one special character'),

  otp: z
    .string()
    .min(6, "OTP must be 6 digits")
    .max(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),

})







