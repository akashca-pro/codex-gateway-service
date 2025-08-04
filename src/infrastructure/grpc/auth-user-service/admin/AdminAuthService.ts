import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { IAdminAuthService } from "@/domain/auth-service/admin/IAdminAuthServices";

import { 
  AuthAdminServiceClient,
  LoginRequest, LoginResponse,
  RefreshTokenRequest, RefreshTokenResponse
} from '@akashcapro/codex-shared-utils';

import { GrpcBaseService } from "../../GrpcBaseService";

export class GrpcAdminAuthService extends GrpcBaseService implements IAdminAuthService {
  private client: AuthAdminServiceClient;

  constructor() {
    super();
    this.client = new AuthAdminServiceClient(
      config.GRPC_AUTH_SERVER_URL!,
      credentials.createInsecure()
    );
  }

  login = async (
    request: LoginRequest,
    metadata: Metadata = new Metadata()
  ): Promise<LoginResponse>  => {
    return this.grpcCall(this.client.login.bind(this.client), request, metadata);
  }

  refreshToken = async (
    request: RefreshTokenRequest,
    metadata: Metadata = new Metadata()
  ): Promise<RefreshTokenResponse> => {
    return this.grpcCall(this.client.refreshToken.bind(this.client), request, metadata);
  }
}
