import { credentials, Metadata } from "@grpc/grpc-js";
import { config } from "@/config";
import { IAuthService } from "@/domain/auth_service/IAuth_services";

import {
    Auth_User_ServiceClient,
    SignupRequest, SignupResponse,
    ResendOtpRequest, ResendOtpResponse,
    VerifyOtpRequest, VerifyOtpResponse,
    LoginRequest, LoginResponse,
    GoogleLoginRequest, GoogleLoginResponse,
    ForgotPasswordRequest, ForgotPasswordResponse,
    ChangePasswordRequest, ChangePasswordResponse
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

    // Signup method
    async signup(request : SignupRequest, metadata : Metadata = new Metadata()) : Promise<SignupResponse> {
        return this.grpc_call(this.client.signup, request, metadata)
    }

    // Resend OTP method
    async resend_otp(request : ResendOtpRequest, metadata : Metadata = new Metadata()) : Promise<ResendOtpResponse> {
        return this.grpc_call(this.client.resendOtp,request, metadata)
    } 

    // Verify OTP method
    async verify_otp(request : VerifyOtpRequest, metadata : Metadata = new Metadata()) : Promise<VerifyOtpResponse> {
        return this.grpc_call(this.client.verifyOtp,request,metadata)
    }
    
    // Login method
    async login(request : LoginRequest, metadata : Metadata = new Metadata()) : Promise<LoginResponse> {
        return this.grpc_call(this.client.login,request,metadata);
    }

    // Google login
    async google_login(request : GoogleLoginRequest, metadata: Metadata = new Metadata()) : Promise<GoogleLoginResponse> {
        return this.grpc_call(this.client.googleLogin,request,metadata)
    }   

    async forgot_password(request : ForgotPasswordRequest, metadata: Metadata = new Metadata()) : Promise<ForgotPasswordResponse> {
        return this.grpc_call(this.client.forgotPassword,request,metadata)
    }
    
    async change_password(request : ChangePasswordRequest, metadata: Metadata = new Metadata()) : Promise<ChangePasswordResponse> {
        return this.grpc_call(this.client.changePassword,request,metadata)
    } 
}