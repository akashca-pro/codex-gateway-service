import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { IAuthService } from "@/domain/auth_service/IAuth_services";

import {
    Auth_User_ServiceClient,
    Signup_Request, Signup_Response,
    Resend_Otp_Request, Resend_Otp_Response,
    Verify_Otp_Request, Verify_Otp_Response,
    Login_Request, Login_Response,
    Google_Login_Request, Google_Login_Response,
    Forgot_Password_Request, Forgot_Password_Response,
    Change_Password_Request, Change_Password_Response,
    Refresh_Token_Request, Refresh_Token_Response
} from '@akashcapro/codex-shared-utils';
import { GrpcBaseService } from "../Grpc_Base_Service";


export class Grpc_Auth_Service extends GrpcBaseService implements IAuthService {
    private client : Auth_User_ServiceClient;

    constructor(){
        super();
        this.client = new Auth_User_ServiceClient(
            config.AUTH_SERVICE_URL,
            credentials.createInsecure()
        )
    }

    async signup(request : Signup_Request, metadata : Metadata = new Metadata()) : Promise<Signup_Response> {
        return this.grpc_call(this.client.signup, request, metadata)
    }

    async resend_otp(request : Resend_Otp_Request, metadata : Metadata = new Metadata()) : Promise<Resend_Otp_Response> {
        return this.grpc_call(this.client.resendOtp,request, metadata)
    } 

    async verify_otp(request : Verify_Otp_Request, metadata : Metadata = new Metadata()) : Promise<Verify_Otp_Response> {
        return this.grpc_call(this.client.verifyOtp,request,metadata)
    }
    
    async login(request : Login_Request, metadata : Metadata = new Metadata()) : Promise<Login_Response> {
        return this.grpc_call(this.client.login,request,metadata);
    }

    async google_login(request : Google_Login_Request, metadata: Metadata = new Metadata()) : Promise<Google_Login_Response> {
        return this.grpc_call(this.client.googleLogin,request,metadata)
    }   

    async forgot_password(request : Forgot_Password_Request, metadata: Metadata = new Metadata()) : Promise<Forgot_Password_Response> {
        return this.grpc_call(this.client.forgotPassword,request,metadata)
    }
    
    async change_password(request : Change_Password_Request, metadata: Metadata = new Metadata()) : Promise<Change_Password_Response> {
        return this.grpc_call(this.client.changePassword,request,metadata)
    }

    async refresh_token(request: Refresh_Token_Request, metadata: Metadata = new Metadata()): Promise<Refresh_Token_Response> {
        return this.grpc_call(this.client.refreshToken,request, metadata)
    }
}