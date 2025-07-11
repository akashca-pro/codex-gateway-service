import {
    SignupRequest, SignupResponse,
    ResendOtpRequest, ResendOtpResponse,
    VerifyOtpRequest, VerifyOtpResponse,
    LoginRequest, LoginResponse,
    GoogleLoginRequest, GoogleLoginResponse,
    ForgotPasswordRequest, ForgotPasswordResponse,
    ChangePasswordRequest, ChangePasswordResponse
} from '@akashcapro/codex-shared-utils';

export interface IAuthService {
  signup(req: SignupRequest): Promise<SignupResponse>;

  resend_otp(req: ResendOtpRequest): Promise<ResendOtpResponse>;

  verify_otp(req: VerifyOtpRequest): Promise<VerifyOtpResponse>;

  login(req: LoginRequest): Promise<LoginResponse>;

  google_login(req: GoogleLoginRequest): Promise<GoogleLoginResponse>;

  forgot_password(req: ForgotPasswordRequest): Promise<ForgotPasswordResponse>;

  change_password(req: ChangePasswordRequest): Promise<ChangePasswordResponse>;
}