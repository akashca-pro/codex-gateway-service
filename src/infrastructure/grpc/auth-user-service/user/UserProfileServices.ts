import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { IUserProfileService } from '@/domain/auth-service/User/IUserProfileservices'

import {

    AuthUserServiceClient,
    UserProfileRequest,
    UserProfileResponse

} from '@akashcapro/codex-shared-utils'
import { GrpcBaseService } from "../../GrpcBaseService";
import { TokenContext } from "@/types/TokenContext";

export class GrpcUserProfileService extends GrpcBaseService implements IUserProfileService {

    private client : AuthUserServiceClient;

    constructor(){
        super();
        this.client = new AuthUserServiceClient(
            config.AUTH_SERVICE_URL,
            credentials.createInsecure()
        )
    }

    async profile(request : UserProfileRequest, meta? : TokenContext) : Promise<UserProfileResponse> {
        const metadata = new Metadata();

        if(meta){
            metadata.set('user_id',meta.userId);
            metadata.set('email',meta.email);
            metadata.set('role',meta.role);
        }

        return this.grpcCall(this.client.profile, request, metadata)
    }

}