import rateLimit, { type RateLimitRequestHandler } from "express-rate-limit";

/**
 * Rate Limiter Configurations
 * Different rate limits based on route sensitivity and usage patterns
 */

// Default rate limiter for general API routes
export const defaultLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    status: 429,
    error: "Too many requests, please try again later.",
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Strict rate limiter for authentication routes (login, register, password reset)
// More restrictive to prevent brute-force attacks
export const authLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 auth requests per window
  message: {
    status: 429,
    error: "Too many authentication attempts, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false, // Count all requests
});

// Rate limiter for problem-related routes
// More generous since users may browse many problems
export const problemsLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per window
  message: {
    status: 429,
    error: "Too many requests to problems API, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for code submission/execution routes
// Moderate limits to prevent abuse while allowing reasonable usage
export const codepadLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 code submissions per window
  message: {
    status: 429,
    error: "Too many code submissions, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for collaboration routes
export const collabLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 150, // Limit each IP to 150 collab requests per window
  message: {
    status: 429,
    error: "Too many collaboration requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for admin routes
// Stricter limits for security
export const adminLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // Limit each IP to 60 admin requests per window
  message: {
    status: 429,
    error: "Too many admin requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for profile routes
export const profileLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 profile requests per window
  message: {
    status: 429,
    error: "Too many profile requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for leaderboard routes
export const leaderboardLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 120, // Limit each IP to 120 leaderboard requests per window
  message: {
    status: 429,
    error: "Too many leaderboard requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for dashboard routes
export const dashboardLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 dashboard requests per window
  message: {
    status: 429,
    error: "Too many dashboard requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter for metrics/analytics routes
export const metricsLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 metrics requests per window
  message: {
    status: 429,
    error: "Too many metrics requests, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Legacy export for backward compatibility
export const limiter = defaultLimiter;