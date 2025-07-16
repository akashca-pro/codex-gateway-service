import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { IUserAuthService } from "@/domain/auth-service/User/IUserAuthServices";

import {
  AuthUserServiceClient,
  SignupRequest, SignupResponse,
  ResendOtpRequest, ResendOtpResponse,
  VerifyOtpRequest, VerifyOtpResponse,
  LoginRequest, LoginResponse,
  GoogleLoginRequest, GoogleLoginResponse,
  ForgotPasswordRequest, ForgotPasswordResponse,
  ChangePasswordRequest, ChangePasswordResponse,
  RefreshTokenRequest, RefreshTokenResponse
} from '@akashcapro/codex-shared-utils';

import { GrpcBaseService } from "../../GrpcBaseService";

export class GrpcUserAuthService extends GrpcBaseService implements IUserAuthService {
  private client: AuthUserServiceClient

  constructor() {
    super();
    this.client = new AuthUserServiceClient(
      config.AUTH_SERVICE_URL,
      credentials.createInsecure()
    );
  }

  async signup(request: SignupRequest, metadata: Metadata = new Metadata()): Promise<SignupResponse> {
    return this.grpcCall(this.client.signup, request, metadata);
  }

  async resendOtp(request: ResendOtpRequest, metadata: Metadata = new Metadata()): Promise<ResendOtpResponse> {
    return this.grpcCall(this.client.resendOtp, request, metadata);
  }

  async verifyOtp(request: VerifyOtpRequest, metadata: Metadata = new Metadata()): Promise<VerifyOtpResponse> {
    return this.grpcCall(this.client.verifyOtp, request, metadata);
  }

  async login(request: LoginRequest, metadata: Metadata = new Metadata()): Promise<LoginResponse> {
    return this.grpcCall(this.client.login, request, metadata);
  }

  async googleLogin(request: GoogleLoginRequest, metadata: Metadata = new Metadata()): Promise<GoogleLoginResponse> {
    return this.grpcCall(this.client.googleLogin, request, metadata);
  }

  async forgotPassword(request: ForgotPasswordRequest, metadata: Metadata = new Metadata()): Promise<ForgotPasswordResponse> {
    return this.grpcCall(this.client.forgotPassword, request, metadata);
  }

  async changePassword(request: ChangePasswordRequest, metadata: Metadata = new Metadata()): Promise<ChangePasswordResponse> {
    return this.grpcCall(this.client.changePassword, request, metadata);
  }

  async refreshToken(request: RefreshTokenRequest, metadata: Metadata = new Metadata()): Promise<RefreshTokenResponse> {
    return this.grpcCall(this.client.refreshToken, request, metadata);
  }
}
