import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { I_User_Profile_Service } from '@/domain/auth_service/user/I_User_Profile_services'

import {

    Auth_User_ServiceClient,
    User_Profile_Request,
    User_Profile_Response

} from '@akashcapro/codex-shared-utils'
import { GrpcBaseService } from "../../Grpc_Base_Service";
import { Token_Context } from "@/types/token_context";

export class Grpc_User_Profile_Service extends GrpcBaseService implements I_User_Profile_Service {

    private client : Auth_User_ServiceClient;

    constructor(){
        super();
        this.client = new Auth_User_ServiceClient(
            config.AUTH_SERVICE_URL,
            credentials.createInsecure()
        )
    }

    async profile(request : User_Profile_Request, meta? : Token_Context) : Promise<User_Profile_Response> {
        const metadata = new Metadata();

        if(meta){
            metadata.set('user_id',meta.user_id);
            metadata.set('email',meta.email);
            metadata.set('role',meta.role);
        }

        return this.grpc_call(this.client.profile, request, metadata)
    }

}