import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { I_Admin_Profile_Service } from "@/domain/auth_service/admin/I_Admin_Profile_Service";

import { 
    Auth_Admin_ServiceClient,
    Admin_Profile_Request,Admin_Profile_Response
 } from '@akashcapro/codex-shared-utils';
import { GrpcBaseService } from "../../Grpc_Base_Service";
import { Token_Context } from "@/types/token_context";

 export class Grpc_Admin_Profile_Service extends GrpcBaseService implements I_Admin_Profile_Service {

    private client : Auth_Admin_ServiceClient

    constructor(){
        super();
        this.client = new Auth_Admin_ServiceClient(
            config.AUTH_SERVICE_URL,credentials.createInsecure()
        )
    }

    async profile(
        request : Admin_Profile_Request,
        meta? : Token_Context

    ) : Promise<Admin_Profile_Response> {
        const metadata = new Metadata();
        if(meta){
            metadata.set('user_id',meta.user_id);
            metadata.set('email',meta.email);
            metadata.set('role',meta.role);
        } 
        return this.grpc_call(this.client.profile, request, metadata);    
    }

 }