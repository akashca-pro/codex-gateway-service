import { IAdminAuthService } from "@/infra/grpc/auth-user-service/interfaces/admin/IAdminAuthServices";
import { LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from "@akashcapro/codex-shared-utils";

export class AdminAuthUseCases {
    constructor(
        private auth_services : IAdminAuthService
    ){}

    async login (data : LoginRequest) : Promise<LoginResponse> {
        return this.auth_services.login(data);
    }

    async refreshToken (data : RefreshTokenRequest) : Promise<RefreshTokenResponse> {
        return this.auth_services.refreshToken(data);
    }

}