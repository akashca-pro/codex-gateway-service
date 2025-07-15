import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { IUserService } from '@/domain/auth_service/IUser_services'

import {

    Auth_User_ServiceClient,
    Profile_Request,
    Profile_Response

} from '@akashcapro/codex-shared-utils'
import { GrpcBaseService } from "../Grpc_Base_Service";
import { User_Context } from "@/types/user_context";

export class Grpc_User_Service extends GrpcBaseService implements IUserService {

    private client : Auth_User_ServiceClient;

    constructor(){
        super();
        this.client = new Auth_User_ServiceClient(
            config.AUTH_SERVICE_URL,
            credentials.createInsecure()
        )
    }

    async profile(request : Profile_Request, context? : User_Context) : Promise<Profile_Response> {
        const metadata = new Metadata();

        if(context){
            metadata.set('user_id',context.user_id);
            metadata.set('email',context.email);
            metadata.set('role',context.role);
        }

        return this.grpc_call(this.client.profile, request, metadata)
    }

}