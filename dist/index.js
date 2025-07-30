"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// package.json
var require_package = __commonJS({
  "package.json"(exports2, module2) {
    module2.exports = {
      name: "grpc-gateway",
      version: "1.0.0",
      main: "index.js",
      scripts: {
        dev: "nodemon --exec ts-node --require tsconfig-paths/register src/main.ts",
        build: "tsup src/index.ts --format cjs"
      },
      keywords: [],
      author: "",
      license: "ISC",
      description: "",
      dependencies: {
        "@akashcapro/codex-shared-utils": "^0.1.26",
        "@grpc/grpc-js": "^1.13.4",
        "cookie-parser": "^1.4.7",
        cors: "^2.8.5",
        dotenv: "^17.1.0",
        express: "^5.1.0",
        "express-rate-limit": "^7.5.1",
        "express-rate-limiter": "^1.3.1",
        helmet: "^8.1.0",
        ioredis: "^5.6.1",
        jsonwebtoken: "^9.0.2",
        "ts-proto": "^2.7.5",
        tsup: "^8.5.0",
        winston: "^3.17.0",
        zod: "^4.0.5"
      },
      devDependencies: {
        "@types/cookie-parser": "^1.4.9",
        "@types/cors": "^2.8.19",
        "@types/express": "^5.0.3",
        "@types/express-rate-limit": "^5.1.3",
        "@types/helmet": "^0.0.48",
        "@types/jsonwebtoken": "^9.0.10",
        "@typescript-eslint/eslint-plugin": "^8.36.0",
        "@typescript-eslint/parser": "^8.36.0",
        eslint: "^9.30.1",
        "eslint-config-prettier": "^10.1.5",
        "eslint-plugin-prettier": "^5.5.1",
        nodemon: "^3.1.10",
        prettier: "^3.6.2",
        "ts-node": "^10.9.2",
        "ts-node-dev": "^2.0.0",
        "tsconfig-paths": "^4.2.0",
        typescript: "^5.8.3"
      }
    };
  }
});

// src/index.ts
var import_express5 = __toESM(require("express"));
var import_dotenv2 = __toESM(require("dotenv"));

// src/presentation/middlewares/rate-limiter.ts
var import_express_rate_limit = __toESM(require("express-rate-limit"));
var limiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  // 15 minutes
  max: 100
  // Limit each IP to 100 requests per window
});

// src/index.ts
var import_helmet = __toESM(require("helmet"));
var import_cors = __toESM(require("cors"));
var import_logger8 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/logger"));

// src/config/index.ts
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var config = {
  SERVICE_NAME: require_package().name,
  DEFAULT_GRPC_TIMEOUT: Number(process.env.DEFAULT_GRPC_TIMEOUT) || 5e3,
  PORT: Number(process.env.PORT) || 4e3,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || "jwt_access_token_secret",
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || "jwt_refresh_token_secret",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  REDIS_URL: process.env.REDIS_URL || "redis://localhost:6379",
  GRPC_AUTH_SERVER_URL: process.env.GRPC_AUTH_SERVER_URL || "localhost:50051"
};

// src/index.ts
var import_cookie_parser = __toESM(require("cookie-parser"));

// src/presentation/routes/auth-user-service/user/auth.ts
var import_express = __toESM(require("express"));

// src/application/auth-user-service/user/UserAuthUseCases.ts
var UserAuthUseCases = class {
  constructor(authService) {
    this.authService = authService;
  }
  async signup(data) {
    return this.authService.signup(data);
  }
  async login(data) {
    return this.authService.login(data);
  }
  async resendOtp(data) {
    return this.authService.resendOtp(data);
  }
  async verifyOtp(data) {
    return this.authService.verifyOtp(data);
  }
  async oAuthLogin(data) {
    return this.authService.oAuthLogin(data);
  }
  async forgotPassword(data) {
    return this.authService.forgotPassword(data);
  }
  async resetPassword(data) {
    return this.authService.resetPassword(data);
  }
  async refreshToken(data) {
    return this.authService.refreshToken(data);
  }
};

// src/infrastructure/grpc/auth-user-service/user/UserAuthServices.ts
var import_grpc_js2 = require("@grpc/grpc-js");
var import_codex_shared_utils = require("@akashcapro/codex-shared-utils");

// src/infrastructure/grpc/GrpcBaseService.ts
var import_grpc_js = require("@grpc/grpc-js");
var import_logger = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/logger"));
var GrpcBaseService = class {
  grpcCall(method, request, metadata = new import_grpc_js.Metadata()) {
    return new Promise((resolve, reject) => {
      const deadline = new Date(Date.now() + config.DEFAULT_GRPC_TIMEOUT);
      method(
        request,
        metadata,
        (error, response) => {
          if (error) {
            import_logger.default.error(`gRPC error in ${method.name}: ${error.message}`);
            reject(error);
          }
          resolve(response);
        }
      );
    });
  }
};

// src/infrastructure/grpc/auth-user-service/user/UserAuthServices.ts
var GrpcUserAuthService = class extends GrpcBaseService {
  client;
  constructor() {
    super();
    this.client = new import_codex_shared_utils.AuthUserServiceClient(
      config.GRPC_AUTH_SERVER_URL,
      import_grpc_js2.credentials.createInsecure()
    );
  }
  signup = async (request, metadata = new import_grpc_js2.Metadata()) => {
    return this.grpcCall(this.client.signup.bind(this.client), request, metadata);
  };
  resendOtp = async (request, metadata = new import_grpc_js2.Metadata()) => {
    return this.grpcCall(this.client.resendOtp.bind(this.client), request, metadata);
  };
  verifyOtp = async (request, metadata = new import_grpc_js2.Metadata()) => {
    return this.grpcCall(this.client.verifyOtp.bind(this.client), request, metadata);
  };
  login = async (request, metadata = new import_grpc_js2.Metadata()) => {
    return this.grpcCall(this.client.login.bind(this.client), request, metadata);
  };
  oAuthLogin = async (request, metadata = new import_grpc_js2.Metadata()) => {
    return this.grpcCall(this.client.oAuthLogin.bind(this.client), request, metadata);
  };
  forgotPassword = async (request, metadata = new import_grpc_js2.Metadata()) => {
    return this.grpcCall(this.client.forgotPassword.bind(this.client), request, metadata);
  };
  resetPassword = async (request, metadata = new import_grpc_js2.Metadata()) => {
    return this.grpcCall(this.client.resetPassword.bind(this.client), request, metadata);
  };
  refreshToken = async (request, metadata = new import_grpc_js2.Metadata()) => {
    return this.grpcCall(this.client.refreshToken.bind(this.client), request, metadata);
  };
};

// src/presentation/controllers/auth-user-service/user/auth.ts
var import_response_handler = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var import_codex_shared_utils2 = require("@akashcapro/codex-shared-utils");
var import_logger3 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/logger"));

// src/utility/set-cookie.ts
var setCookie = (res, key, value, max_age) => {
  res.cookie(key, value, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: max_age
  });
};

// src/config/redis.ts
var import_ioredis = __toESM(require("ioredis"));
var import_logger2 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/logger"));
var RedisClient = class _RedisClient {
  static instance;
  static isConnected = false;
  constructor() {
  }
  static getInstance() {
    if (!_RedisClient.instance) {
      _RedisClient.instance = new import_ioredis.default(config.REDIS_URL, {
        retryStrategy: (times) => {
          const delay = Math.min(times * 50, 2e3);
          return delay;
        },
        maxRetriesPerRequest: 3
      });
      _RedisClient.setupEventListeners();
    }
    return _RedisClient.instance;
  }
  static setupEventListeners() {
    _RedisClient.instance.on("ready", () => {
      _RedisClient.isConnected = true;
      import_logger2.default.info("Redis is ready");
    });
    _RedisClient.instance.on("error", (error) => {
      _RedisClient.isConnected = false;
      import_logger2.default.error("Redis connection error:", error);
    });
    _RedisClient.instance.on("close", () => {
      _RedisClient.isConnected = false;
      import_logger2.default.warn("Redis connection closed");
    });
    _RedisClient.instance.on("reconnecting", () => {
      import_logger2.default.info("Reconnecting to Redis...");
    });
  }
  static isReady() {
    return _RedisClient.isConnected;
  }
};
var redis_default = RedisClient.getInstance();

// src/presentation/controllers/auth-user-service/user/auth.ts
var authUseCase = new UserAuthUseCases(new GrpcUserAuthService());
var authController = {
  signup: async (req, res) => {
    try {
      const grpcResponse = await authUseCase.signup(req.body);
      console.log(grpcResponse);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK);
    } catch (error) {
      const grpcError = error;
      import_logger3.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils2.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  resendOtp: async (req, res) => {
    try {
      const grpcResponse = await authUseCase.resendOtp(req.body);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK);
    } catch (error) {
      const grpcError = error;
      import_logger3.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils2.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  verifyOtp: async (req, res) => {
    try {
      const grpcResponse = await authUseCase.verifyOtp(req.body);
      setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1e3);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, 7 * 24 * 60 * 60 * 1e3);
      setCookie(res, "role", "user", 7 * 24 * 60 * 60 * 1e3);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK, grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error;
      import_logger3.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils2.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  login: async (req, res) => {
    try {
      const grpcResponse = await authUseCase.login(req.body);
      if (grpcResponse.accessToken && grpcResponse.refreshToken) {
        setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1e3);
        setCookie(res, "refreshToken", grpcResponse.refreshToken, 7 * 24 * 60 * 60 * 1e3);
        setCookie(res, "role", "user", 7 * 24 * 60 * 60 * 1e3);
        return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK, grpcResponse.userInfo);
      } else {
        return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.ACCEPTED, "not-verified");
      }
    } catch (error) {
      const grpcError = error;
      import_logger3.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils2.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  oAuthLogin: async (req, res) => {
    try {
      const grpcResponse = await authUseCase.oAuthLogin(req.body);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK, grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error;
      import_logger3.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils2.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const grpcResponse = await authUseCase.forgotPassword(req.body);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK);
    } catch (error) {
      const grpcError = error;
      import_logger3.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils2.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  resetPassword: async (req, res) => {
    try {
      const grpcResponse = await authUseCase.resetPassword(req.body);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK);
    } catch (error) {
      const grpcError = error;
      import_logger3.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils2.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { userId, email, role } = req;
      if (!userId || !email || !role) {
        return import_response_handler.default.error(res, "Invalid Token", import_status_code.default.UNAUTHORIZED);
      }
      const grpcResponse = await authUseCase.refreshToken({ userId, email, role });
      setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1e3);
      return import_response_handler.default.success(res, grpcResponse.message, import_status_code.default.OK, grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error;
      import_logger3.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils2.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  logout: async (req, res) => {
    try {
      const now = Math.floor(Date.now() / 1e3);
      const ttl = req.tokenExp - now;
      await redis_default.set(`blacklist:${req.tokenId}`, "1", "EX", ttl);
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      return import_response_handler.default.success(res, "Logout Successfully", import_status_code.default.OK);
    } catch (error) {
      return import_response_handler.default.error(res, "Internal Server Error", import_status_code.default.INTERNAL_SERVER_ERROR);
    }
  },
  checkAuth: async (req, res) => {
    try {
      return import_response_handler.default.success(res, "Authenticated", import_status_code.default.OK, {
        userId: req.userId,
        email: req.email,
        role: req.role
      });
    } catch (error) {
      return import_response_handler.default.error(res, "Internal Server Error", import_status_code.default.INTERNAL_SERVER_ERROR);
    }
  }
};

// src/presentation/middlewares/jwt.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_logger4 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/logger"));
var import_response_handler2 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code2 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var verifyJwt = (token, secret) => {
  return import_jsonwebtoken.default.verify(token, secret);
};
var verifyAccessToken = (acceptedRole) => (req, res, next) => {
  const token = req.cookies["accessToken"];
  if (!token)
    return import_response_handler2.default.error(res, "Token not found", import_status_code2.default.UNAUTHORIZED);
  try {
    const decoded = verifyJwt(token, config.JWT_ACCESS_TOKEN_SECRET);
    if (!decoded || !decoded.userId || !decoded.email || !decoded.role || !decoded.tokenId) {
      return import_response_handler2.default.error(res, "Invalid Token payload", import_status_code2.default.UNAUTHORIZED);
    }
    if (decoded.role !== acceptedRole.toUpperCase())
      return import_response_handler2.default.error(res, "Entry Restricted", import_status_code2.default.UNAUTHORIZED);
    redis_default.get(`blacklist:${decoded.tokenId}`).then((result) => {
      if (result) {
        return import_response_handler2.default.error(res, "Token is blacklisted", import_status_code2.default.UNAUTHORIZED);
      }
    });
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.role = decoded.role;
    req.tokenId = decoded.tokenId;
    req.tokenExp = decoded.exp;
    next();
  } catch (error) {
    import_logger4.default.error("JWT access token verification failed", error);
    return import_response_handler2.default.error(res, "Invalid Token", import_status_code2.default.UNAUTHORIZED);
  }
};
var verifyRefreshToken = (acceptedRole) => (req, res, next) => {
  const token = req.cookies["refreshToken"];
  if (!token)
    return import_response_handler2.default.error(res, "Token not found", import_status_code2.default.UNAUTHORIZED);
  try {
    const decoded = verifyJwt(token, config.JWT_REFRESH_TOKEN_SECRET);
    if (!decoded || !decoded.userId || !decoded.email || !decoded.role || !decoded.tokenId) {
      return import_response_handler2.default.error(res, "Invalid Token", import_status_code2.default.UNAUTHORIZED);
    }
    if (decoded.role !== acceptedRole.toUpperCase())
      return import_response_handler2.default.error(res, "Entry Restricted", import_status_code2.default.UNAUTHORIZED);
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error) {
    import_logger4.default.error("JWT refresh token verification failed", error);
    return import_response_handler2.default.error(res, "Invalid Token", import_status_code2.default.UNAUTHORIZED);
  }
};

// src/presentation/middlewares/validateRequest.ts
var import_response_handler3 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code3 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var validateRequestBody = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const formattedErrors = result.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message
    }));
    return import_response_handler3.default.error(
      res,
      "Validation Error",
      import_status_code3.default.BAD_REQUEST,
      formattedErrors
    );
  }
  next();
};

// src/infrastructure/validation/user.schema.ts
var import_zod = require("zod");
var signupSchema = import_zod.z.object({
  username: import_zod.z.string().min(3, "Username must be at least 3 characters").max(20, "Username must not exceed 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  firstName: import_zod.z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters").regex(/^[a-zA-Z]+$/, "First name must contain only letters"),
  lastName: import_zod.z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters").regex(/^[a-zA-Z]+$/, "Last name must contain only letters").optional(),
  email: import_zod.z.email("Invalid email address").min(5).max(255),
  password: import_zod.z.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
  country: import_zod.z.string().min(3, "Country name must be at least 3 characters").max(20)
});
var resendOtpSchema = import_zod.z.object({
  email: import_zod.z.email("Invalid email address").min(5).max(255)
});
var verifyOtpSchema = import_zod.z.object({
  email: import_zod.z.email("Invalid email address").min(5).max(255),
  otp: import_zod.z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must contain only numbers")
});
var userLoginSchema = import_zod.z.object({
  email: import_zod.z.email("Invalid email address").min(5).max(255),
  password: import_zod.z.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character")
});
var forgotPasswordSchema = import_zod.z.object({
  email: import_zod.z.email("Invalid email address").min(5).max(255)
});
var resetPasswordSchema = import_zod.z.object({
  email: import_zod.z.email("Invalid email address").min(5).max(255),
  Password: import_zod.z.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character"),
  otp: import_zod.z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits").regex(/^\d+$/, "OTP must contain only numbers")
});

// src/presentation/routes/auth-user-service/user/auth.ts
var Router = import_express.default.Router();
Router.post("/signup", validateRequestBody(signupSchema), authController.signup);
Router.post("/otp/resend-otp", validateRequestBody(resendOtpSchema), authController.resendOtp);
Router.post("/otp/verify-otp", validateRequestBody(verifyOtpSchema), authController.verifyOtp);
Router.post("/login", validateRequestBody(userLoginSchema), authController.login);
Router.post("/login/google-login", authController.oAuthLogin);
Router.post("/password/forgot/request", validateRequestBody(forgotPasswordSchema), authController.forgotPassword);
Router.post("/password/change", validateRequestBody(resetPasswordSchema), authController.resetPassword);
Router.post("/refresh-token", verifyRefreshToken("user"), authController.refreshToken);
Router.delete("/logout", verifyAccessToken("user"), authController.logout);
Router.get("/check-auth", verifyAccessToken("user"), authController.checkAuth);
var auth_default = Router;

// src/presentation/routes/auth-user-service/user/profile.ts
var import_express2 = __toESM(require("express"));

// src/application/auth-user-service/user/UserProfileUseCases.ts
var UserProfileUseCases = class {
  constructor(user_service) {
    this.user_service = user_service;
  }
  async profile(data) {
    return this.user_service.profile(data);
  }
};

// src/infrastructure/grpc/auth-user-service/user/UserProfileServices.ts
var import_grpc_js3 = require("@grpc/grpc-js");
var import_codex_shared_utils3 = require("@akashcapro/codex-shared-utils");
var GrpcUserProfileService = class extends GrpcBaseService {
  client;
  constructor() {
    super();
    this.client = new import_codex_shared_utils3.AuthUserServiceClient(
      config.GRPC_AUTH_SERVER_URL,
      import_grpc_js3.credentials.createInsecure()
    );
  }
  profile = async (request, meta) => {
    const metadata = new import_grpc_js3.Metadata();
    if (meta) {
      metadata.set("user_id", meta.userId);
      metadata.set("email", meta.email);
      metadata.set("role", meta.role);
    }
    return this.grpcCall(this.client.profile.bind(this.client), request, metadata);
  };
};

// src/presentation/controllers/auth-user-service/user/profile.ts
var import_response_handler4 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code4 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var import_codex_shared_utils4 = require("@akashcapro/codex-shared-utils");
var import_logger5 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/logger"));
var userUseCase = new UserProfileUseCases(
  new GrpcUserProfileService()
);
var profileController = {
  profile: async (req, res) => {
    try {
      const { userId, email, role } = req;
      if (!userId || !email || !role) {
        return import_response_handler4.default.error(res, "Invalid Token", import_status_code4.default.UNAUTHORIZED);
      }
      const grpcResponse = await userUseCase.profile({ userId, email });
      return import_response_handler4.default.success(res, "Profile data loaded successfully", import_status_code4.default.OK, {
        ...grpcResponse
      });
    } catch (error) {
      const grpcError = error;
      import_logger5.default.error(grpcError.message);
      return import_response_handler4.default.error(
        res,
        grpcError.message || "Internal Server Error",
        (0, import_codex_shared_utils4.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  }
};

// src/presentation/routes/auth-user-service/user/profile.ts
var Router2 = import_express2.default.Router();
Router2.get("/profile", verifyAccessToken("user"), profileController.profile);
var profile_default = Router2;

// src/presentation/routes/auth-user-service/admin/auth.ts
var import_express3 = __toESM(require("express"));

// src/application/auth-user-service/admin/AdminAuthUseCases.ts
var Admin_Auth_Use_Cases = class {
  constructor(auth_services) {
    this.auth_services = auth_services;
  }
  async login(data) {
    return this.auth_services.login(data);
  }
  async refreshToken(data) {
    return this.auth_services.refreshToken(data);
  }
};

// src/infrastructure/grpc/auth-user-service/admin/AdminAuthService.ts
var import_grpc_js4 = require("@grpc/grpc-js");
var import_codex_shared_utils5 = require("@akashcapro/codex-shared-utils");
var GrpcAdminAuthService = class extends GrpcBaseService {
  client;
  constructor() {
    super();
    this.client = new import_codex_shared_utils5.AuthAdminServiceClient(
      config.GRPC_AUTH_SERVER_URL,
      import_grpc_js4.credentials.createInsecure()
    );
  }
  login = async (request, metadata = new import_grpc_js4.Metadata()) => {
    return this.grpcCall(this.client.login.bind(this.client), request, metadata);
  };
  refreshToken = async (request, metadata = new import_grpc_js4.Metadata()) => {
    return this.grpcCall(this.client.refreshToken.bind(this.client), request, metadata);
  };
};

// src/presentation/controllers/auth-user-service/admin/auth.ts
var import_codex_shared_utils6 = require("@akashcapro/codex-shared-utils");
var import_logger6 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/logger"));
var import_response_handler5 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code5 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var authUseCase2 = new Admin_Auth_Use_Cases(new GrpcAdminAuthService());
var authController2 = {
  login: async (req, res) => {
    try {
      const grpcResponse = await authUseCase2.login(req.body);
      setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1e3);
      setCookie(res, "refreshToken", grpcResponse.refreshToken, 7 * 24 * 60 * 60 * 1e3);
      setCookie(res, "role", "admin", 7 * 24 * 60 * 60 * 1e3);
      return import_response_handler5.default.success(res, grpcResponse.message, import_status_code5.default.OK, grpcResponse.userInfo);
    } catch (error) {
      const grpcError = error;
      import_logger6.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler5.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils6.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  refreshToken: async (req, res) => {
    try {
      const { userId, email, role } = req;
      if (!userId || !email || !role) {
        return import_response_handler5.default.error(res, "Invalid Token", import_status_code5.default.UNAUTHORIZED);
      }
      const grpcResponse = await authUseCase2.refreshToken({ userId, email, role });
      setCookie(res, "accessToken", grpcResponse.accessToken, 1 * 60 * 60 * 1e3);
      return import_response_handler5.default.success(res, grpcResponse.message, import_status_code5.default.OK, {
        accessToken: grpcResponse.accessToken
      });
    } catch (error) {
      const grpcError = error;
      import_logger6.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler5.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils6.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      res.clearCookie("role", {
        httpOnly: true,
        secure: true,
        sameSite: "strict"
      });
      return import_response_handler5.default.success(res, "Logout Successfully", import_status_code5.default.OK);
    } catch (error) {
      return import_response_handler5.default.error(res, "Internal Server Error", import_status_code5.default.INTERNAL_SERVER_ERROR);
    }
  },
  checkAuth: async (req, res) => {
    try {
      return import_response_handler5.default.success(res, "Authenticated", import_status_code5.default.OK, {
        userId: req.userId,
        email: req.email,
        role: req.role
      });
    } catch (error) {
      return import_response_handler5.default.error(res, "Internal Server Error", import_status_code5.default.INTERNAL_SERVER_ERROR);
    }
  }
};

// src/infrastructure/validation/admin.schema.ts
var import_zod2 = require("zod");
var adminLoginSchema = import_zod2.z.object({
  email: import_zod2.z.email("Invalid email address").min(5).max(255),
  password: import_zod2.z.string().min(8, "Password must be at least 8 characters").max(100).regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[@$!%*?&#]/, "Password must contain at least one special character")
});

// src/presentation/routes/auth-user-service/admin/auth.ts
var Router3 = import_express3.default.Router();
Router3.post("/login", validateRequestBody(adminLoginSchema), authController2.login);
Router3.post("/refresh-token", verifyRefreshToken("admin"), authController2.refreshToken);
Router3.delete("/logout", verifyAccessToken("admin"), authController2.logout);
Router3.get("/check-auth", verifyAccessToken("admin"), authController2.checkAuth);
var auth_default2 = Router3;

// src/presentation/routes/auth-user-service/admin/profile.ts
var import_express4 = __toESM(require("express"));

// src/application/auth-user-service/admin/AdminProfileUseCases.ts
var AdminProfileUseCases = class {
  constructor(profile_service) {
    this.profile_service = profile_service;
  }
  async profile(data, meta) {
    return this.profile_service.profile(data, meta);
  }
};

// src/infrastructure/grpc/auth-user-service/admin/AdminProfileService.ts
var import_grpc_js5 = require("@grpc/grpc-js");
var import_codex_shared_utils7 = require("@akashcapro/codex-shared-utils");
var GrpcAdminProfileService = class extends GrpcBaseService {
  client;
  constructor() {
    super();
    this.client = new import_codex_shared_utils7.AuthAdminServiceClient(
      config.GRPC_AUTH_SERVER_URL,
      import_grpc_js5.credentials.createInsecure()
    );
  }
  profile = async (request, meta) => {
    const metadata = new import_grpc_js5.Metadata();
    if (meta) {
      metadata.set("userId", meta.userId);
      metadata.set("email", meta.email);
      metadata.set("role", meta.role);
    }
    return this.grpcCall(this.client.profile.bind(this.client), request, metadata);
  };
};

// src/presentation/controllers/auth-user-service/admin/profile.ts
var import_response_handler6 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/response_handler"));
var import_status_code6 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/status_code"));
var import_codex_shared_utils8 = require("@akashcapro/codex-shared-utils");
var import_logger7 = __toESM(require("@akashcapro/codex-shared-utils/dist/utils/logger"));
var profileUseCase = new AdminProfileUseCases(new GrpcAdminProfileService());
var profileController2 = {
  profile: async (req, res) => {
    try {
      const { userId, email, role } = req;
      if (!userId || !email || !role) {
        return import_response_handler6.default.error(res, "Invalid Token", import_status_code6.default.UNAUTHORIZED);
      }
      const metadata = { userId, email, role };
      const grpcResponse = await profileUseCase.profile(req.body, metadata);
      return import_response_handler6.default.success(res, "Load Profile Success", import_status_code6.default.OK, { ...grpcResponse });
    } catch (error) {
      const grpcError = error;
      import_logger7.default.error(grpcError.message);
      const errorMessage = grpcError.message?.split(":")[1]?.trim();
      return import_response_handler6.default.error(
        res,
        errorMessage || "Internal Server Error",
        (0, import_codex_shared_utils8.mapGrpcCodeToHttp)(grpcError.code)
      );
    }
  }
};

// src/presentation/routes/auth-user-service/admin/profile.ts
var Router4 = import_express4.default.Router();
Router4.get("/", verifyAccessToken("admin"), profileController2.profile);
var profile_default2 = Router4;

// src/index.ts
import_dotenv2.default.config();
var app = (0, import_express5.default)();
app.use(import_express5.default.json());
app.use(import_express5.default.urlencoded({ extended: true }));
app.use((0, import_cookie_parser.default)());
app.use((0, import_helmet.default)());
app.use((0, import_cors.default)({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(limiter);
app.use((req, res, next) => {
  import_logger8.default.debug(`[${(/* @__PURE__ */ new Date()).toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.use("/api/v1/user/auth/", auth_default);
app.use("/api/v1/user/dashboard/", profile_default);
app.use("/api/v1/admin/auth/", auth_default2);
app.use("/api/v1/admin/dashboard/", profile_default2);
app.use((req, res, next) => {
  import_logger8.default.warn(`Resource not found : ${req.method} ${req.url} `);
  res.status(404).json({ message: "Resource not found" });
});
app.use((err, req, res, next) => {
  import_logger8.default.error("Unhandled error", err);
  res.status(500).json({ message: "Internal server error" });
});
var startServer = () => {
  try {
    app.listen(config.PORT, () => {
      import_logger8.default.info(`${config.SERVICE_NAME} running on port ${config.PORT}`);
    });
  } catch (error) {
    import_logger8.default.error("Failed to start server : ", error);
    process.exit(1);
  }
};
startServer();
