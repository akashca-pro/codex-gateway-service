import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { I_Admin_Auth_Service } from "@/domain/auth_service/admin/I_Admin_Auth_Services";

import { 
    Auth_Admin_ServiceClient,
    Admin_Login_Request,Admin_Login_Response,
    Refresh_Token_Request,
    Refresh_Token_Response, 
 } from '@akashcapro/codex-shared-utils';
import { GrpcBaseService } from "../../Grpc_Base_Service";

 export class Grpc_Admin_Auth_Service extends GrpcBaseService implements I_Admin_Auth_Service {

    private client : Auth_Admin_ServiceClient

    constructor(){
        super();
        this.client = new Auth_Admin_ServiceClient(
            config.AUTH_SERVICE_URL,credentials.createInsecure()
        )
    }

    async login(
        request : Admin_Login_Request,
        metadata : Metadata = new Metadata()
    ) : Promise<Admin_Login_Response> {

        return this.grpc_call(this.client.login, request, metadata)

    }

    async refresh_token(
        request : Refresh_Token_Request,
        metadata : Metadata = new Metadata()
    ) : Promise<Refresh_Token_Response> {

        return this.grpc_call(this.client.refreshToken,request,metadata)

    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         .

 }