import { IUserAuthService } from "@/infrastructure/grpc/auth-user-service/interfaces/User/IUserAuthServices";

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

  async oAuthLogin(data: OAuthLoginRequest): Promise<OAuthLoginResponse> {
    return this.authService.oAuthLogin(data);
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> {
    return this.authService.forgotPassword(data);
  }

  async resetPassword(data: ResetPasswordRequest): Promise<ResetPasswordResponse> {
    return this.authService.resetPassword(data);
  }

  async refreshToken(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
    return this.authService.refreshToken(data);
  }
}
