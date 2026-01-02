import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Codex Gateway API',
    version: '1.0.0',
    description: `
The Gateway Service is the single public entry point to the Codex platform.
All client HTTP traffic flows through this service. It performs authentication, 
request validation, rate limiting, logging and orchestrates outbound gRPC calls 
to downstream microservices.

## Authentication
Most endpoints require JWT authentication. The JWT tokens are stored in HttpOnly cookies:
- \`accessToken\`: Short-lived access token for API requests
- \`refreshToken\`: Long-lived token for refreshing access tokens

Cookies are automatically sent with each request. After successful login, the server sets these cookies.

## Rate Limiting
API requests are rate-limited to prevent abuse. Excessive requests will receive 429 responses.
    `,
    contact: {
      name: 'Codex API Support',
    },
    license: {
      name: 'MIT',
      url: 'https://opensource.org/licenses/MIT',
    },
  },
  servers: [
    {
      url: '/api/v1',
      description: 'API v1',
    },
  ],
  tags: [
    { name: 'User Auth', description: 'User authentication endpoints' },
    { name: 'Admin Auth', description: 'Admin authentication endpoints' },
    { name: 'User Profile', description: 'User profile management' },
    { name: 'Admin Profile', description: 'Admin profile management' },
    { name: 'Problems (Public)', description: 'Public problem endpoints' },
    { name: 'Problems (User)', description: 'Authenticated user problem endpoints' },
    { name: 'Problems (Admin)', description: 'Admin problem management endpoints' },
    { name: 'Codepad', description: 'Code execution sandbox endpoints' },
    { name: 'Collaboration', description: 'Real-time collaboration session endpoints' },
    { name: 'Leaderboard', description: 'Leaderboard endpoints' },
    { name: 'Dashboard', description: 'Dashboard analytics endpoints' },
    { name: 'Metrics', description: 'System metrics endpoints (Admin only)' },
    { name: 'User Management', description: 'User management endpoints (Admin only)' },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'accessToken',
        description: 'JWT access token stored in HttpOnly cookie. Automatically sent with requests.',
      },
    },
    schemas: {
      // Common schemas
      Error: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Error message' },
          errors: { 
            type: 'array',
            items: { type: 'object' },
            description: 'Validation error details'
          },
        },
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { type: 'object' },
        },
      },
      // Auth schemas
      SignupRequest: {
        type: 'object',
        required: ['username', 'firstName', 'email', 'password', 'country'],
        properties: {
          username: { type: 'string', minLength: 3, maxLength: 20, example: 'john_doe' },
          firstName: { type: 'string', minLength: 2, maxLength: 50, example: 'John' },
          lastName: { type: 'string', minLength: 2, maxLength: 50, example: 'Doe' },
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          password: { type: 'string', minLength: 8, example: 'SecurePass1!' },
          country: { type: 'string', example: 'USA' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          password: { type: 'string', example: 'SecurePass1!' },
        },
      },
      OtpRequest: {
        type: 'object',
        required: ['email', 'otp'],
        properties: {
          email: { type: 'string', format: 'email', example: 'john@example.com' },
          otp: { type: 'string', minLength: 6, maxLength: 6, example: '123456' },
        },
      },
      GoogleLoginRequest: {
        type: 'object',
        required: ['oAuthId'],
        properties: {
          oAuthId: { type: 'string', description: 'Google OAuth ID token' },
        },
      },
      ResetPasswordRequest: {
        type: 'object',
        required: ['email', 'newPassword', 'otp'],
        properties: {
          email: { type: 'string', format: 'email' },
          newPassword: { type: 'string', minLength: 8 },
          otp: { type: 'string', minLength: 6, maxLength: 6 },
        },
      },
      // Profile schemas
      UpdateProfileRequest: {
        type: 'object',
        properties: {
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          avatar: { type: 'string', format: 'binary' },
        },
      },
      ChangePasswordRequest: {
        type: 'object',
        required: ['currentPassword', 'newPassword'],
        properties: {
          currentPassword: { type: 'string' },
          newPassword: { type: 'string', minLength: 8 },
        },
      },
      // Problem schemas
      Problem: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
          tags: { type: 'array', items: { type: 'string' } },
        },
      },
      CreateProblemRequest: {
        type: 'object',
        required: ['title', 'description', 'difficulty'],
        properties: {
          questionId: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
          tags: { type: 'array', items: { type: 'string' } },
          constraints: { type: 'string' },
          hints: { type: 'array', items: { type: 'string' } },
        },
      },
      // Code execution schemas
      RunCodeRequest: {
        type: 'object',
        required: ['code', 'language'],
        properties: {
          code: { type: 'string' },
          language: { type: 'string', enum: ['javascript', 'python', 'java', 'cpp', 'c'] },
          stdin: { type: 'string' },
        },
      },
      SubmitCodeRequest: {
        type: 'object',
        required: ['code', 'language'],
        properties: {
          code: { type: 'string' },
          language: { type: 'string', enum: ['javascript', 'python', 'java', 'cpp', 'c'] },
        },
      },
      // Pagination
      PaginationQuery: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1, default: 1 },
          limit: { type: 'integer', minimum: 1, maximum: 100, default: 10 },
          cursor: { type: 'string', description: 'Cursor for cursor-based pagination' },
        },
      },

      // ==================== AUTH RESPONSE SCHEMAS ====================
      UserInfo: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'Unique user identifier' },
          username: { type: 'string', description: 'User display name' },
          email: { type: 'string', format: 'email' },
          firstName: { type: 'string' },
          lastName: { type: 'string', nullable: true },
          avatar: { type: 'string', nullable: true, description: 'Cloudinary public ID' },
          country: { type: 'string', nullable: true },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/UserInfo' },
        },
      },
      SignupResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string', example: 'OTP sent to your email' },
        },
      },
      VerifyOtpResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/UserInfo' },
        },
      },
      TokenRefreshResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/UserInfo' },
        },
      },

      // ==================== PROFILE RESPONSE SCHEMAS ====================
      UserProfileData: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
          firstName: { type: 'string' },
          lastName: { type: 'string', nullable: true },
          avatar: { type: 'string', nullable: true },
          country: { type: 'string', nullable: true },
          preferredLanguage: { type: 'string', nullable: true, enum: ['javascript', 'python', 'go'] },
          isVerified: { type: 'boolean' },
          isBlocked: { type: 'boolean' },
          authProvider: { type: 'string', enum: ['LOCAL', 'GOOGLE'] },
          easySolved: { type: 'integer', nullable: true },
          mediumSolved: { type: 'integer', nullable: true },
          hardSolved: { type: 'integer', nullable: true },
          totalSubmission: { type: 'integer', nullable: true },
          streak: { type: 'integer', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      UserProfileResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/UserProfileData' },
        },
      },
      UpdateProfileData: {
        type: 'object',
        nullable: true,
        properties: {
          username: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string', nullable: true },
          country: { type: 'string', nullable: true },
          avatar: { type: 'string', nullable: true },
          preferredLanguage: { type: 'string', nullable: true },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      UpdateProfileResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/UpdateProfileData' },
        },
      },

      // ==================== PROBLEM NESTED SCHEMAS ====================
      Example: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          input: { type: 'string' },
          output: { type: 'string' },
          explanation: { type: 'string', nullable: true },
        },
      },
      SolutionRoadmap: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          level: { type: 'integer', description: 'Sequential hint level (1,2,3...)' },
          description: { type: 'string', description: 'Hint for this level of the solution' },
        },
      },
      StarterCode: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          language: { type: 'integer', enum: [1, 2, 3], description: '1=JavaScript, 2=Python, 3=Go' },
          code: { type: 'string', description: 'Initial code template for the user' },
        },
      },
      TemplateCode: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          language: { type: 'integer', enum: [1, 2, 3], description: '1=JavaScript, 2=Python, 3=Go' },
          submitWrapperCode: { type: 'string', description: 'Server-side wrapper code for submissions' },
          runWrapperCode: { type: 'string', description: 'Server-side wrapper code for run tests' },
        },
      },
      TestCase: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          input: { type: 'string' },
          output: { type: 'string', description: 'Expected output' },
        },
      },
      TestCaseCollection: {
        type: 'object',
        properties: {
          run: {
            type: 'array',
            items: { $ref: '#/components/schemas/TestCase' },
            description: 'Test cases shown to user during code run',
          },
          submit: {
            type: 'array',
            items: { $ref: '#/components/schemas/TestCase' },
            description: 'Hidden test cases for submission evaluation',
          },
        },
      },

      // ==================== PROBLEM RESPONSE SCHEMAS ====================
      ProblemListItem: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          questionId: { type: 'string', description: 'Human-readable problem ID (e.g., "two-sum")' },
          title: { type: 'string' },
          difficulty: { type: 'integer', enum: [1, 2, 3], description: '1=Easy, 2=Medium, 3=Hard' },
          tags: { type: 'array', items: { type: 'string' } },
          active: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      ListProblemsData: {
        type: 'object',
        properties: {
          problems: {
            type: 'array',
            items: { $ref: '#/components/schemas/ProblemListItem' },
          },
          currentPage: { type: 'integer' },
          totalItems: { type: 'integer' },
          totalPage: { type: 'integer' },
        },
      },
      ListProblemsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/ListProblemsData' },
        },
      },
      ProblemPublicDetail: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          questionId: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          difficulty: { type: 'integer', enum: [1, 2, 3] },
          tags: { type: 'array', items: { type: 'string' } },
          constraints: { type: 'array', items: { type: 'string' } },
          examples: {
            type: 'array',
            items: { $ref: '#/components/schemas/Example' },
          },
          starterCodes: {
            type: 'array',
            items: { $ref: '#/components/schemas/StarterCode' },
          },
          run: {
            type: 'array',
            items: { $ref: '#/components/schemas/TestCase' },
            description: 'Sample test cases for running code',
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      GetProblemPublicResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/ProblemPublicDetail' },
        },
      },
      ProblemAdminDetail: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          questionId: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          difficulty: { type: 'integer', enum: [1, 2, 3] },
          tags: { type: 'array', items: { type: 'string' } },
          active: { type: 'boolean' },
          constraints: { type: 'array', items: { type: 'string' } },
          examples: {
            type: 'array',
            items: { $ref: '#/components/schemas/Example' },
          },
          starterCodes: {
            type: 'array',
            items: { $ref: '#/components/schemas/StarterCode' },
          },
          solutionRoadmap: {
            type: 'array',
            items: { $ref: '#/components/schemas/SolutionRoadmap' },
          },
          testcaseCollection: { $ref: '#/components/schemas/TestCaseCollection' },
          templateCodes: {
            type: 'array',
            items: { $ref: '#/components/schemas/TemplateCode' },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      GetProblemAdminResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/ProblemAdminDetail' },
        },
      },
      CreateProblemResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/ProblemAdminDetail' },
        },
      },

      // ==================== CODE EXECUTION NESTED SCHEMAS ====================
      TestResult: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          index: { type: 'string' },
          input: { type: 'string' },
          output: { type: 'string', description: 'Actual output from code execution' },
          expectedOutput: { type: 'string' },
          passed: { type: 'boolean' },
          executionTimeMs: { type: 'number' },
          memoryMB: { type: 'number' },
        },
      },
      ExecutionStats: {
        type: 'object',
        properties: {
          totalTestCase: { type: 'integer' },
          passedTestCase: { type: 'integer' },
          failedTestCase: { type: 'integer' },
          stdout: { type: 'string', nullable: true },
          executionTimeMs: { type: 'number', nullable: true },
          memoryMB: { type: 'number', nullable: true },
        },
      },
      FailedTestCase: {
        type: 'object',
        nullable: true,
        properties: {
          index: { type: 'integer' },
          input: { type: 'string' },
          output: { type: 'string', description: 'Actual output (or error message)' },
          expectedOutput: { type: 'string' },
        },
      },
      ExecutionResult: {
        type: 'object',
        properties: {
          stats: { $ref: '#/components/schemas/ExecutionStats' },
          failedTestCase: { $ref: '#/components/schemas/FailedTestCase' },
          testResults: {
            type: 'array',
            items: { $ref: '#/components/schemas/TestResult' },
            description: 'Individual test case results (for run code)',
          },
        },
      },

      // ==================== CODE EXECUTION RESPONSE SCHEMAS ====================
      RunCodeData: {
        type: 'object',
        properties: {
          tempId: { type: 'string', description: 'Temporary ID to poll for results via WebSocket or REST' },
        },
      },
      RunCodeResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/RunCodeData' },
        },
      },
      SubmitCodeData: {
        type: 'object',
        properties: {
          submissionId: { type: 'string', description: 'Submission ID to poll for results' },
        },
      },
      SubmitCodeResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/SubmitCodeData' },
        },
      },
      RunCodeResultData: {
        type: 'object',
        nullable: true,
        properties: {
          tempId: { type: 'string' },
          executionResult: { $ref: '#/components/schemas/ExecutionResult' },
        },
      },
      RunCodeResultResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/RunCodeResultData' },
        },
      },
      CustomCodeResultData: {
        type: 'object',
        nullable: true,
        properties: {
          tempId: { type: 'string' },
          stdOut: { type: 'string', description: 'Console output from code execution' },
        },
      },
      CustomCodeResultResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/CustomCodeResultData' },
        },
      },

      // ==================== SUBMISSION RESPONSE SCHEMAS ====================
      SubmissionListItem: {
        type: 'object',
        properties: {
          Id: { type: 'string' },
          status: { type: 'string', enum: ['pending', 'accepted', 'wrong_answer', 'time_limit_exceeded', 'memory_limit_exceeded', 'runtime_error', 'compilation_error'] },
          language: { type: 'integer', enum: [1, 2, 3], description: '1=JavaScript, 2=Python, 3=Go' },
          executionResult: { $ref: '#/components/schemas/ExecutionResult' },
          userCode: { type: 'string' },
          hintsUsed: { type: 'integer' },
          isAiAssisted: { type: 'boolean' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      ListProblemSubmissionsData: {
        type: 'object',
        properties: {
          submissions: {
            type: 'array',
            items: { $ref: '#/components/schemas/SubmissionListItem' },
          },
          nextCursor: { type: 'string', nullable: true, description: 'Cursor for next page (createdAt timestamp)' },
          hasMore: { type: 'boolean' },
        },
      },
      ListProblemSubmissionsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/ListProblemSubmissionsData' },
        },
      },
      SubmissionResultData: {
        type: 'object',
        nullable: true,
        properties: {
          submissionId: { type: 'string' },
          userId: { type: 'string' },
          executionResult: { $ref: '#/components/schemas/ExecutionResult' },
        },
      },
      SubmissionResultResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/SubmissionResultData' },
        },
      },

      // ==================== LEADERBOARD RESPONSE SCHEMAS ====================
      LeaderboardUser: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'User ID' },
          entity: { type: 'string', nullable: true, description: 'Country code (e.g., "IN", "US")' },
          score: { type: 'number' },
          problemsSolved: { type: 'integer', nullable: true },
          username: { type: 'string', nullable: true },
          rank: { type: 'integer', nullable: true, description: '1-based rank' },
        },
      },
      LeaderboardData: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: { $ref: '#/components/schemas/LeaderboardUser' },
          },
        },
      },
      GlobalLeaderboardResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/LeaderboardData' },
        },
      },
      CountryLeaderboardResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/LeaderboardData' },
        },
      },

      // ==================== DASHBOARD NESTED SCHEMAS ====================
      HeatmapActivity: {
        type: 'object',
        properties: {
          date: { type: 'string', format: 'date', description: 'YYYY-MM-DD format' },
          count: { type: 'integer', description: 'Number of submissions on this day' },
        },
      },
      LeaderboardDetails: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          username: { type: 'string', nullable: true },
          score: { type: 'number' },
          entity: { type: 'string', description: 'Country code' },
          globalRank: { type: 'integer', description: '0-based global rank (-1 if unranked)' },
          entityRank: { type: 'integer', description: '0-based country rank (-1 if unranked)' },
        },
      },
      SolvedByDifficulty: {
        type: 'object',
        properties: {
          difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
          count: { type: 'integer' },
        },
      },
      RecentActivity: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'Problem title' },
          difficulty: { type: 'string', enum: ['easy', 'medium', 'hard'] },
          status: { type: 'string', enum: ['accepted', 'wrong_answer', 'time_limit_exceeded', 'memory_limit_exceeded', 'runtime_error', 'compilation_error'] },
          language: { type: 'string' },
          timeAgo: { type: 'string', description: 'Human-readable time (e.g., "2 hours ago")' },
        },
      },

      // ==================== DASHBOARD RESPONSE SCHEMAS ====================
      UserDashboardData: {
        type: 'object',
        properties: {
          heatmap: {
            type: 'array',
            items: { $ref: '#/components/schemas/HeatmapActivity' },
          },
          currentStreak: { type: 'integer', description: 'Current consecutive day streak' },
          leaderboardDetails: { $ref: '#/components/schemas/LeaderboardDetails' },
          problemsSolved: { type: 'integer' },
          recentActivities: {
            type: 'array',
            items: { $ref: '#/components/schemas/RecentActivity' },
          },
          solvedByDifficulty: {
            type: 'array',
            items: { $ref: '#/components/schemas/SolvedByDifficulty' },
          },
        },
      },
      UserDashboardResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/UserDashboardData' },
        },
      },
      LanguageStats: {
        type: 'object',
        properties: {
          language: { type: 'string' },
          count: { type: 'integer' },
        },
      },
      DifficultyStats: {
        type: 'object',
        properties: {
          difficulty: { type: 'string' },
          count: { type: 'integer' },
        },
      },
      AdminSubmissionStats: {
        type: 'object',
        properties: {
          totalSubmissions: { type: 'integer' },
          todaysSubmissions: { type: 'integer' },
          languageWise: {
            type: 'array',
            items: { $ref: '#/components/schemas/LanguageStats' },
          },
        },
      },
      AdminProblemStats: {
        type: 'object',
        properties: {
          totalProblems: { type: 'integer' },
          todaysProblems: { type: 'integer' },
          difficultyWise: {
            type: 'array',
            items: { $ref: '#/components/schemas/DifficultyStats' },
          },
        },
      },
      AdminUserStats: {
        type: 'object',
        properties: {
          totalUsers: { type: 'integer' },
          todaysUsers: { type: 'integer' },
        },
      },
      SessionStatusCounts: {
        type: 'object',
        properties: {
          active: { type: 'integer' },
          ended: { type: 'integer' },
          offline: { type: 'integer' },
        },
      },
      AdminCollabStats: {
        type: 'object',
        properties: {
          total: { $ref: '#/components/schemas/SessionStatusCounts' },
          today: { $ref: '#/components/schemas/SessionStatusCounts' },
        },
      },
      AdminProblemSubmissionStats: {
        type: 'object',
        properties: {
          submissionStats: { $ref: '#/components/schemas/AdminSubmissionStats' },
          problemStats: { $ref: '#/components/schemas/AdminProblemStats' },
        },
      },
      AdminDashboardData: {
        type: 'object',
        properties: {
          problemSubmissionStats: { $ref: '#/components/schemas/AdminProblemSubmissionStats' },
          userStats: { $ref: '#/components/schemas/AdminUserStats' },
          collabStats: { $ref: '#/components/schemas/AdminCollabStats' },
        },
      },
      AdminDashboardResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/AdminDashboardData' },
        },
      },

      // ==================== COLLABORATION RESPONSE SCHEMAS ====================
      CreateSessionData: {
        type: 'object',
        properties: {
          inviteToken: { type: 'string', description: 'Token to share for joining the session' },
        },
      },
      CreateSessionResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/CreateSessionData' },
        },
      },

      // ==================== USER MANAGEMENT RESPONSE SCHEMAS ====================
      UserListItem: {
        type: 'object',
        properties: {
          userId: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string', format: 'email' },
          firstName: { type: 'string' },
          lastName: { type: 'string', nullable: true },
          avatar: { type: 'string', nullable: true },
          country: { type: 'string', nullable: true },
          isBlocked: { type: 'boolean' },
          isVerified: { type: 'boolean' },
          isArchived: { type: 'boolean' },
          authProvider: { type: 'string', enum: ['LOCAL', 'GOOGLE'] },
          preferredLanguage: { type: 'string', nullable: true },
          easySolved: { type: 'integer', nullable: true },
          mediumSolved: { type: 'integer', nullable: true },
          hardSolved: { type: 'integer', nullable: true },
          totalSubmission: { type: 'integer', nullable: true },
          streak: { type: 'integer', nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      ListUsersData: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: { $ref: '#/components/schemas/UserListItem' },
          },
          currentPage: { type: 'integer' },
          totalItems: { type: 'integer' },
          totalPage: { type: 'integer' },
        },
      },
      ListUsersResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/ListUsersData' },
        },
      },

      // ==================== HINT RESPONSE SCHEMAS ====================
      HintItem: {
        type: 'object',
        properties: {
          hint: { type: 'string', description: 'AI-generated hint text' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
      PreviousHintsData: {
        type: 'object',
        properties: {
          hints: {
            type: 'array',
            items: { $ref: '#/components/schemas/HintItem' },
          },
        },
      },
      PreviousHintsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/PreviousHintsData' },
        },
      },
      RequestHintData: {
        type: 'object',
        properties: {
          hint: { type: 'string', description: 'New AI-generated hint' },
        },
      },
      RequestHintResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/RequestHintData' },
        },
      },
      FullSolutionData: {
        type: 'object',
        properties: {
          solution: { type: 'string', description: 'Complete AI-generated solution code' },
        },
      },
      FullSolutionResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          message: { type: 'string' },
          data: { $ref: '#/components/schemas/FullSolutionData' },
        },
      },

      // ==================== METRICS RESPONSE SCHEMAS ====================
      GrpcMethodMetric: {
        type: 'object',
        properties: {
          method: { type: 'string', description: 'gRPC method name' },
          p50: { type: 'string', description: '50th percentile latency (ms)' },
          p90: { type: 'string', description: '90th percentile latency (ms)' },
          p99: { type: 'string', description: '99th percentile latency (ms)' },
          requestCount: { type: 'string', description: 'Total requests in time window' },
          errorRate: { type: 'string', description: 'Error percentage' },
        },
      },
      GrpcMetricsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'array',
            items: { $ref: '#/components/schemas/GrpcMethodMetric' },
          },
        },
      },
      HttpMetricsResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'array',
            items: { type: 'object', description: 'Prometheus metric object' },
          },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: 'Authentication required or token invalid',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      Forbidden: {
        description: 'Access denied',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      ValidationError: {
        description: 'Validation failed',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
      TooManyRequests: {
        description: 'Rate limit exceeded',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
  },
  paths: {
    // ==================== USER AUTH ====================
    '/user/auth/signup': {
      post: {
        tags: ['User Auth'],
        summary: 'Register a new user',
        description: 'Register a new user account and send OTP for verification',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SignupRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'User registered, OTP sent', content: { 'application/json': { schema: { $ref: '#/components/schemas/SignupResponse' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
          '409': { description: 'Email or username already exists' },
          '429': { $ref: '#/components/responses/TooManyRequests' },
        },
      },
    },
    '/user/auth/otp/resend-otp': {
      post: {
        tags: ['User Auth'],
        summary: 'Resend signup OTP',
        description: 'Resend OTP for signup verification',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: { email: { type: 'string', format: 'email' } },
              },
            },
          },
        },
        responses: {
          '200': { description: 'OTP resent successfully', content: { 'application/json': { schema: { $ref: '#/components/schemas/SuccessResponse' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
          '429': { $ref: '#/components/responses/TooManyRequests' },
        },
      },
    },
    '/user/auth/otp/verify-otp': {
      post: {
        tags: ['User Auth'],
        summary: 'Verify signup OTP',
        description: 'Verify OTP to complete signup',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OtpRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'OTP verified, account activated', content: { 'application/json': { schema: { $ref: '#/components/schemas/VerifyOtpResponse' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
          '429': { $ref: '#/components/responses/TooManyRequests' },
        },
      },
    },
    '/user/auth/login': {
      post: {
        tags: ['User Auth'],
        summary: 'User login',
        description: 'Authenticate user and issue access/refresh tokens',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
            headers: {
              'Set-Cookie': { description: 'Refresh token cookie', schema: { type: 'string' } },
            },
            content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } },
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '401': { description: 'Invalid credentials' },
          '429': { $ref: '#/components/responses/TooManyRequests' },
        },
      },
    },
    '/user/auth/login/google-login': {
      post: {
        tags: ['User Auth'],
        summary: 'Google OAuth login',
        description: 'Authenticate or register user via Google OAuth',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/GoogleLoginRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Login successful', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
          '429': { $ref: '#/components/responses/TooManyRequests' },
        },
      },
    },
    '/user/auth/password/forgot/request': {
      post: {
        tags: ['User Auth'],
        summary: 'Request password reset',
        description: 'Send OTP to email for password reset',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: { email: { type: 'string', format: 'email' } },
              },
            },
          },
        },
        responses: {
          '200': { description: 'OTP sent to email' },
          '400': { $ref: '#/components/responses/ValidationError' },
          '429': { $ref: '#/components/responses/TooManyRequests' },
        },
      },
    },
    '/user/auth/password/forgot/request/resend-otp': {
      post: {
        tags: ['User Auth'],
        summary: 'Resend forgot password OTP',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: { email: { type: 'string', format: 'email' } },
              },
            },
          },
        },
        responses: {
          '200': { description: 'OTP resent successfully' },
          '429': { $ref: '#/components/responses/TooManyRequests' },
        },
      },
    },
    '/user/auth/password/forgot/change': {
      post: {
        tags: ['User Auth'],
        summary: 'Reset password',
        description: 'Verify OTP and change password',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ResetPasswordRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Password reset successful' },
          '400': { $ref: '#/components/responses/ValidationError' },
          '429': { $ref: '#/components/responses/TooManyRequests' },
        },
      },
    },
    '/user/auth/refresh-token': {
      post: {
        tags: ['User Auth'],
        summary: 'Refresh access token',
        description: 'Issue new access token using refresh token',
        responses: {
          '200': { description: 'New access token issued', content: { 'application/json': { schema: { $ref: '#/components/schemas/TokenRefreshResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/auth/logout': {
      delete: {
        tags: ['User Auth'],
        summary: 'User logout',
        description: 'Invalidate tokens and logout user',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'Logout successful' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== ADMIN AUTH ====================
    '/admin/auth/login': {
      post: {
        tags: ['Admin Auth'],
        summary: 'Admin login',
        description: 'Authenticate admin and issue tokens',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Login successful', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
          '401': { description: 'Invalid credentials' },
        },
      },
    },
    '/admin/auth/refresh-token': {
      post: {
        tags: ['Admin Auth'],
        summary: 'Refresh admin access token',
        responses: {
          '200': { description: 'New access token issued', content: { 'application/json': { schema: { $ref: '#/components/schemas/TokenRefreshResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/auth/logout': {
      delete: {
        tags: ['Admin Auth'],
        summary: 'Admin logout',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'Logout successful' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== USER PROFILE ====================
    '/user/profile': {
      get: {
        tags: ['User Profile'],
        summary: 'Get user profile',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'Profile data', content: { 'application/json': { schema: { $ref: '#/components/schemas/UserProfileResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/profile/update': {
      patch: {
        tags: ['User Profile'],
        summary: 'Update user profile',
        security: [{ cookieAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: { $ref: '#/components/schemas/UpdateProfileRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Profile updated', content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateProfileResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/profile/password/change': {
      post: {
        tags: ['User Profile'],
        summary: 'Change password',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ChangePasswordRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Password changed' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/profile/email/change': {
      post: {
        tags: ['User Profile'],
        summary: 'Request email change',
        description: 'Send OTP to new email for verification',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['newEmail'],
                properties: { newEmail: { type: 'string', format: 'email' } },
              },
            },
          },
        },
        responses: {
          '200': { description: 'OTP sent to new email' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/profile/email/change/resend-otp': {
      post: {
        tags: ['User Profile'],
        summary: 'Resend email change OTP',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'OTP resent' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/profile/email/change/verify': {
      post: {
        tags: ['User Profile'],
        summary: 'Verify email change',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/OtpRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Email updated' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/profile/delete': {
      patch: {
        tags: ['User Profile'],
        summary: 'Delete account',
        description: 'Archive user account',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'Account archived' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== ADMIN PROFILE ====================
    '/admin/profile': {
      get: {
        tags: ['Admin Profile'],
        summary: 'Get admin profile',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'Profile data' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/profile/update': {
      patch: {
        tags: ['Admin Profile'],
        summary: 'Update admin profile',
        security: [{ cookieAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: { $ref: '#/components/schemas/UpdateProfileRequest' },
            },
          },
        },
        responses: {
          '200': { description: 'Profile updated' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== PUBLIC PROBLEMS ====================
    '/public/problems': {
      get: {
        tags: ['Problems (Public)'],
        summary: 'List problems',
        description: 'Get paginated list of problems with filters',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
          { name: 'difficulty', in: 'query', schema: { type: 'string', enum: ['easy', 'medium', 'hard'] } },
          { name: 'search', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'List of problems', content: { 'application/json': { schema: { $ref: '#/components/schemas/ListProblemsResponse' } } } },
        },
      },
    },
    '/public/problems/{problemId}': {
      get: {
        tags: ['Problems (Public)'],
        summary: 'Get problem details',
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Problem details', content: { 'application/json': { schema: { $ref: '#/components/schemas/GetProblemPublicResponse' } } } },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/public/problems/{problemId}/code/run': {
      post: {
        tags: ['Problems (Public)'],
        summary: 'Run code',
        description: 'Execute code against sample test cases',
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RunCodeRequest' },
            },
          },
        },
        responses: {
          '202': { description: 'Code execution queued', content: { 'application/json': { schema: { $ref: '#/components/schemas/RunCodeResponse' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
        },
      },
    },
    '/public/problems/{problemId}/{tempId}/code/run/result': {
      get: {
        tags: ['Problems (Public)'],
        summary: 'Get run result',
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'tempId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Execution result', content: { 'application/json': { schema: { $ref: '#/components/schemas/RunCodeResultResponse' } } } },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    // ==================== USER PROBLEMS ====================
    '/user/problems/{problemId}/hints': {
      get: {
        tags: ['Problems (User)'],
        summary: 'Get previous hints',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'List of hints', content: { 'application/json': { schema: { $ref: '#/components/schemas/PreviousHintsResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/problems/{problemId}/hints/request': {
      post: {
        tags: ['Problems (User)'],
        summary: 'Request AI hint',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'AI generated hint', content: { 'application/json': { schema: { $ref: '#/components/schemas/RequestHintResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/problems/{problemId}/solution': {
      post: {
        tags: ['Problems (User)'],
        summary: 'Request full solution',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Full solution', content: { 'application/json': { schema: { $ref: '#/components/schemas/FullSolutionResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/problems/{problemId}/code/submit': {
      post: {
        tags: ['Problems (User)'],
        summary: 'Submit solution',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/SubmitCodeRequest' },
            },
          },
        },
        responses: {
          '202': { description: 'Submission queued', content: { 'application/json': { schema: { $ref: '#/components/schemas/SubmitCodeResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/problems/{problemId}/{submissionId}/code/submit/result': {
      get: {
        tags: ['Problems (User)'],
        summary: 'Get submission result',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'submissionId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Submission result', content: { 'application/json': { schema: { $ref: '#/components/schemas/SubmissionResultResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/problems/{problemId}/submissions': {
      get: {
        tags: ['Problems (User)'],
        summary: 'List problem submissions',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'cursor', in: 'query', schema: { type: 'string' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
        ],
        responses: {
          '200': { description: 'List of submissions', content: { 'application/json': { schema: { $ref: '#/components/schemas/ListProblemSubmissionsResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== ADMIN PROBLEMS ====================
    '/admin/problems': {
      get: {
        tags: ['Problems (Admin)'],
        summary: 'List all problems',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
        ],
        responses: {
          '200': { description: 'List of problems', content: { 'application/json': { schema: { $ref: '#/components/schemas/ListProblemsResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/problems/checkQuestionId': {
      get: {
        tags: ['Problems (Admin)'],
        summary: 'Check question ID availability',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'questionId', in: 'query', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Availability status' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/problems/checkTitle': {
      get: {
        tags: ['Problems (Admin)'],
        summary: 'Check title availability',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'title', in: 'query', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Availability status' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/problems/create': {
      post: {
        tags: ['Problems (Admin)'],
        summary: 'Create problem',
        security: [{ cookieAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateProblemRequest' },
            },
          },
        },
        responses: {
          '201': { description: 'Problem created', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateProblemResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/problems/{problemId}': {
      get: {
        tags: ['Problems (Admin)'],
        summary: 'Get problem details',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Problem details', content: { 'application/json': { schema: { $ref: '#/components/schemas/GetProblemAdminResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/problems/{problemId}/update': {
      patch: {
        tags: ['Problems (Admin)'],
        summary: 'Update problem',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Problem updated' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/problems/{problemId}/testCases/add': {
      post: {
        tags: ['Problems (Admin)'],
        summary: 'Add test case',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '201': { description: 'Test case added' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/problems/{problemId}/testCases/bulkUpload': {
      post: {
        tags: ['Problems (Admin)'],
        summary: 'Bulk upload test cases',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '201': { description: 'Test cases uploaded' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/problems/{problemId}/testCases/{testCaseId}/remove': {
      delete: {
        tags: ['Problems (Admin)'],
        summary: 'Remove test case',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'testCaseId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Test case removed' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/problems/{problemId}/templateCodes/{templateCodeId}/update': {
      patch: {
        tags: ['Problems (Admin)'],
        summary: 'Update template code',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'problemId', in: 'path', required: true, schema: { type: 'string' } },
          { name: 'templateCodeId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Template code updated' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== CODEPAD ====================
    '/public/codepad/code/run': {
      post: {
        tags: ['Codepad'],
        summary: 'Run custom code',
        description: 'Execute custom code in sandbox',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/RunCodeRequest' },
            },
          },
        },
        responses: {
          '202': { description: 'Code execution queued', content: { 'application/json': { schema: { $ref: '#/components/schemas/RunCodeResponse' } } } },
          '400': { $ref: '#/components/responses/ValidationError' },
        },
      },
    },
    '/public/codepad/code/{tempId}/run/result': {
      get: {
        tags: ['Codepad'],
        summary: 'Get codepad result',
        parameters: [
          { name: 'tempId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'Execution result', content: { 'application/json': { schema: { $ref: '#/components/schemas/CustomCodeResultResponse' } } } },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    // ==================== COLLABORATION ====================
    '/user/collab/session/create': {
      post: {
        tags: ['Collaboration'],
        summary: 'Create collaboration session',
        description: 'Create a new real-time collaboration session',
        security: [{ cookieAuth: [] }],
        responses: {
          '201': { description: 'Session created with invite token', content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateSessionResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== LEADERBOARD ====================
    '/user/leaderboard/global': {
      get: {
        tags: ['Leaderboard'],
        summary: 'Global leaderboard',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          '200': { description: 'Top global users', content: { 'application/json': { schema: { $ref: '#/components/schemas/GlobalLeaderboardResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/user/leaderboard/country': {
      get: {
        tags: ['Leaderboard'],
        summary: 'Country leaderboard',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'country', in: 'query', required: true, schema: { type: 'string' } },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10 } },
        ],
        responses: {
          '200': { description: 'Top users in country', content: { 'application/json': { schema: { $ref: '#/components/schemas/CountryLeaderboardResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== DASHBOARD ====================
    '/user/dashboard': {
      get: {
        tags: ['Dashboard'],
        summary: 'User dashboard',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'User analytics data', content: { 'application/json': { schema: { $ref: '#/components/schemas/UserDashboardResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/dashboard': {
      get: {
        tags: ['Dashboard'],
        summary: 'Admin dashboard',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'Admin analytics data', content: { 'application/json': { schema: { $ref: '#/components/schemas/AdminDashboardResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== METRICS (Admin) ====================
    '/admin/metrics/grpcMetrics': {
      get: {
        tags: ['Metrics'],
        summary: 'Get gRPC metrics',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'gRPC request/response metrics', content: { 'application/json': { schema: { $ref: '#/components/schemas/GrpcMetricsResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/metrics/httpMetrics': {
      get: {
        tags: ['Metrics'],
        summary: 'Get HTTP metrics',
        security: [{ cookieAuth: [] }],
        responses: {
          '200': { description: 'HTTP request/response metrics', content: { 'application/json': { schema: { $ref: '#/components/schemas/HttpMetricsResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    // ==================== USER MANAGEMENT (Admin) ====================
    '/admin/users': {
      get: {
        tags: ['User Management'],
        summary: 'List users',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer' } },
          { name: 'limit', in: 'query', schema: { type: 'integer' } },
          { name: 'search', in: 'query', schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'List of users', content: { 'application/json': { schema: { $ref: '#/components/schemas/ListUsersResponse' } } } },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/users/{userId}/toggle-block': {
      patch: {
        tags: ['User Management'],
        summary: 'Toggle user block status',
        security: [{ cookieAuth: [] }],
        parameters: [
          { name: 'userId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': { description: 'User block status toggled' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: [], // We're defining paths inline in swaggerDefinition
};

export const swaggerSpec = swaggerJSDoc(options);
