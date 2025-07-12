import { IAuthService } from "@/domain/auth_service/IAuth_services";
import {
    SignupRequest, SignupResponse,
    ResendOtpRequest, ResendOtpResponse,
    VerifyOtpRequest, VerifyOtpResponse,
    LoginRequest, LoginResponse,
    GoogleLoginRequest, GoogleLoginResponse,
    ForgotPasswordRequest, ForgotPasswordResponse,
    ChangePasswordRequest, ChangePasswordResponse
} from '@akashcapro/codex-shared-utils';

export class Auth_Use_Cases {
  constructor(
    private auth_service: IAuthService
  ) {}

  async signup(data: SignupRequest): Promise<SignupResponse> {
    return this.auth_service.signup(data);
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.auth_service.login(data);
  }

  async resend_otp(data: ResendOtpRequest): Promise<ResendOtpResponse> {
    return this.auth_service.resend_otp(data);
  }

  async verify_otp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return this.auth_service.verify_otp(data);
  }

  async google_login(data: GoogleLoginRequest): Promise<GoogleLoginResponse> {
    return this.auth_service.google_login(data);
  }

  async forgot_password(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    return this.auth_service.forgot_password(data);
  }

  async change_password(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    return this.auth_service.change_password(data);
  }
}