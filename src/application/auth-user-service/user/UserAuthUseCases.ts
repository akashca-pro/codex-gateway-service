import { IUserAuthService } from "@/domain/auth-service/User/IUserAuthServices";

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

export class UserAuthUseCases {
  constructor(
    private authService: IUserAuthService
  ) {}

  async signup(data: SignupRequest): Promise<SignupResponse> {
    return this.authService.signup(data);
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.authService.login(data);
  }

  async resendOtp(data: ResendOtpRequest): Promise<ResendOtpResponse> {
    return this.authService.resendOtp(data);
  }

  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    return this.authService.verifyOtp(data);
  }

  async googleLogin(data: GoogleLoginRequest): Promise<GoogleLoginResponse> {
    return this.authService.googleLogin(data);
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    return this.authService.forgotPassword(data);
  }

  async changePassword(data: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    return this.authService.changePassword(data);
  }

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return this.authService.refreshToken(data);
  }
}
