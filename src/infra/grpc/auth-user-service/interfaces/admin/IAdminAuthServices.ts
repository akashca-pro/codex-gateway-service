import { 
    LoginRequest,
    LoginResponse,
    RefreshTokenRequest,
    RefreshTokenResponse
 } from '@akashcapro/codex-shared-utils'


 export interface IAdminAuthService {

    login : (req : LoginRequest) => Promise<LoginResponse>;

    refreshToken : (req : RefreshTokenRequest) => Promise<RefreshTokenResponse>;

 }