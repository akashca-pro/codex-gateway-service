import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { IAdminProfileService } from "@/infra/grpc/auth-user-service/interfaces/admin/IAdminProfileService";

import { 
  AuthAdminServiceClient,
  AdminProfileRequest, AdminProfileResponse
} from '@akashcapro/codex-shared-utils';

import { GrpcBaseService } from "../../GrpcBaseService";
import { TokenContext } from "@/types/TokenContext";

export class GrpcAdminProfileService extends GrpcBaseService implements IAdminProfileService {
  private client: AuthAdminServiceClient;

  constructor() {
    super();
    this.client = new AuthAdminServiceClient(
      config.GRPC_AUTH_SERVER_URL!,
      credentials.createInsecure()
    );
  }

  profile = async (
    request: AdminProfileRequest,
    meta?: TokenContext
  ): Promise<AdminProfileResponse> => {
    const metadata = new Metadata();
    if (meta) {
      metadata.set('userId', meta.userId);
      metadata.set('email', meta.email);
      metadata.set('role', meta.role);
    }
    return this.grpcCall(this.client.profile.bind(this.client), request, metadata);
  }
}
