import {
  SignupRequest, SignupResponse,
  ResendOtpRequest, ResendOtpResponse,
  VerifyOtpRequest, VerifyOtpResponse,
  LoginRequest, LoginResponse,
  GoogleLoginRequest, GoogleLoginResponse,
  ForgotPasswordRequest, ForgotPasswordResponse,
  ChangePasswordRequest, ChangePasswordResponse,
  RefreshTokenRequest, RefreshTokenResponse
} from '@akashcapro/codex-shared-utils';

export interface IUserAuthService {

  signup(req: SignupRequest): Promise<SignupResponse>;

  resendOtp(req: ResendOtpRequest): Promise<ResendOtpResponse>;

  verifyOtp(req: VerifyOtpRequest): Promise<VerifyOtpResponse>;

  login(req: LoginRequest): Promise<LoginResponse>;

  googleLogin(req: GoogleLoginRequest): Promise<GoogleLoginResponse>;

  forgotPassword(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;

  changePassword(req: ChangePasswordRequest): Promise<ChangePasswordResponse>;

  refreshToken(req: RefreshTokenRequest): Promise<RefreshTokenResponse>;

}
