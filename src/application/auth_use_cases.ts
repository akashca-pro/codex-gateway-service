import { IAuthService } from "../domain/IAuth_services";
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
    private authService: IAuthService
  ) {}

  async signup(data: SignupRequest): Promise<SignupResponse> {
    return this.authService.signup(data);
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(data);
  }

  async resend_otp(data: ResendOtpRequest): Promise<ResendOtpResponse> {
    return this.authService.resend_otp(data);
  }

  async verify_otp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return this.authService.verify_otp(data);
  }

  async google_login(data: GoogleLoginRequest): Promise<GoogleLoginResponse> {
    return this.authService.google_login(data);
  }

  async forgot_password(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    return this.authService.forgot_password(data);
  }

  async change_password(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    return this.authService.change_password(data);
  }
}