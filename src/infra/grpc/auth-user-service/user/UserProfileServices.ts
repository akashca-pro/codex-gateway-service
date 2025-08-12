import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { IUserProfileService } from '@/infra/grpc/auth-user-service/interfaces/User/IUserProfileservices'

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
            config.GRPC_AUTH_SERVER_URL!,
            credentials.createInsecure()
        )
    }

    profile = async(
        request : UserProfileRequest,
         meta? : TokenContext
        ) : Promise<UserProfileResponse> => {
        const metadata = new Metadata();

        if(meta){
            metadata.set('userId',meta.userId);
            metadata.set('email',meta.email);
            metadata.set('role',meta.role);
        }

        return this.grpcCall(this.client.profile.bind(this.client), request, metadata)
    }

}