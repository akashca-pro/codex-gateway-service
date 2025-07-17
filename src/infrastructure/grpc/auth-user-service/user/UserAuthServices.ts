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
      config.GRPC_AUTH_SERVER_URL,
      credentials.createInsecure()
    );
  }

  signup = async (
    request: SignupRequest, 
    metadata: Metadata = new Metadata()
  ): Promise<SignupResponse> => {
    return this.grpcCall(this.client.signup.bind(this.client), request, metadata);
  }

  resendOtp = async (
    request: ResendOtpRequest,
     metadata: Metadata = new Metadata()
    ): Promise<ResendOtpResponse> => {
    return this.grpcCall(this.client.resendOtp.bind(this.client), request, metadata);
  }

  verifyOtp = async (
    request: VerifyOtpRequest,
     metadata: Metadata = new Metadata()
    ): Promise<VerifyOtpResponse> => {
    return this.grpcCall(this.client.verifyOtp.bind(this.client), request, metadata);
  }

  login = async (request: LoginRequest,
     metadata: Metadata = new Metadata()
    ): Promise<LoginResponse> => {
    return this.grpcCall(this.client.login.bind(this.client), request, metadata);
  }

  googleLogin = async (request: GoogleLoginRequest,
     metadata: Metadata = new Metadata()
    ): Promise<GoogleLoginResponse> => {
    return this.grpcCall(this.client.googleLogin.bind(this.client), request, metadata);
  }

  forgotPassword = async (
    request: ForgotPasswordRequest, metadata: Metadata = new Metadata()
  ): Promise<ForgotPasswordResponse> => {
    return this.grpcCall(this.client.forgotPassword.bind(this.client), request, metadata);
  }

  changePassword = async (
    request: ChangePasswordRequest, metadata: Metadata = new Metadata()
  ): Promise<ChangePasswordResponse> => {
    return this.grpcCall(this.client.changePassword.bind(this.client), request, metadata);
  }

  refreshToken = async (
    request: RefreshTokenRequest, metadata: Metadata = new Metadata()
  ): Promise<RefreshTokenResponse> => {
    return this.grpcCall(this.client.refreshToken.bind(this.client), request, metadata);
  }
}
