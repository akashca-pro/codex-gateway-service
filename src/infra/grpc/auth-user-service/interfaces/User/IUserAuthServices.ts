import {
  SignupRequest, SignupResponse,
  ResendOtpRequest, ResendOtpResponse,
  VerifyOtpRequest, VerifyOtpResponse,
  LoginRequest, LoginResponse,
  OAuthLoginRequest, OAuthLoginResponse,
  ForgotPasswordRequest, ForgotPasswordResponse,
  ResetPasswordRequest, ResetPasswordResponse,
  RefreshTokenRequest, RefreshTokenResponse
} from '@akashcapro/codex-shared-utils';

export interface IUserAuthService {

  signup(req: SignupRequest): Promise<SignupResponse>;

  resendOtp(req: ResendOtpRequest): Promise<ResendOtpResponse>;

  verifyOtp(req: VerifyOtpRequest): Promise<VerifyOtpResponse>;

  login(req: LoginRequest): Promise<LoginResponse>;

  oAuthLogin(req: OAuthLoginRequest): Promise<OAuthLoginResponse>;

  forgotPassword(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;

  resetPassword(req: ResetPasswordRequest): Promise<ResetPasswordResponse>;

  refreshToken(req: RefreshTokenRequest): Promise<RefreshTokenResponse>;

}
