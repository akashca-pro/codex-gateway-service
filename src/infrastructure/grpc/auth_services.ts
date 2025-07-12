import { credentials, Metadata, ServiceError } from "@grpc/grpc-js";
import { config } from "@/config";
import logger from "@akashcapro/codex-shared-utils/dist/utils/logger";
import type { grpc_unary_method } from '@/types/grpc_method'
import { IAuthService } from "@/domain/IAuth_services";

import {
    AuthServiceClient,
    SignupRequest, SignupResponse,
    ResendOtpRequest, ResendOtpResponse,
    VerifyOtpRequest, VerifyOtpResponse,
    LoginRequest, LoginResponse,
    GoogleLoginRequest, GoogleLoginResponse,
    ForgotPasswordRequest, ForgotPasswordResponse,
    ChangePasswordRequest, ChangePasswordResponse
} from '@akashcapro/codex-shared-utils';


export class Grpc_Auth_Service implements IAuthService {
    private client : AuthServiceClient;

    constructor(){
        this.client = new AuthServiceClient(
            config.AUTH_SERVICE_URL,
            credentials.createInsecure()
        )
    }

    // Generic helper to wrap gRPC calls in promises
    private grpc_call<Req, Res>(
    method: grpc_unary_method<Req, Res>,
    request: Req,
    metadata: Metadata = new Metadata()
    ): Promise<Res> {
    return new Promise((resolve, reject) => {
        const deadline = new Date(Date.now() + config.DEFAULT_GRPC_TIMEOUT); // 5 seconds
        method(
        request,
        metadata,
        { deadline },
        (error: ServiceError | null, response: Res) => {
            if (error) {
            logger.error(`gRPC error in ${method.name}: ${error.message}`);
            return reject(error);
            }
            resolve(response);
        }
        );
    });
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

export const auth_service = new Grpc_Auth_Service()