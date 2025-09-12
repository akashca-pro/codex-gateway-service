import { AuthUserServiceClient, ForgotPasswordRequest, ForgotPasswordResponse, LoginRequest, LoginResponse, OAuthLoginRequest, OAuthLoginResponse, RefreshTokenRequest, RefreshTokenResponse, ResendOtpRequest, ResendOtpResponse, ResetPasswordRequest, ResetPasswordResponse, SignupRequest, SignupResponse, UpdateProfileRequest, UpdateProfileResponse, UserProfileRequest, UserProfileResponse, VerifyOtpRequest, VerifyOtpResponse } from "@akashcapro/codex-shared-utils";
import { GrpcBaseService } from "../GrpcBaseService";
import { config } from "@/config";
import { credentials } from "@grpc/grpc-js";


/**
 * Class implementing the user grpc client call.
 * 
 * @class
 * @extends {GrpcBaseService}
 */
class GrpcUserService extends GrpcBaseService {

    #_client : AuthUserServiceClient

    constructor(){
        super();
        this.#_client = new AuthUserServiceClient(
            config.GRPC_AUTH_SERVER_URL!,
            credentials.createInsecure()
        );
    }

    signup = async (
        request: SignupRequest, 
    ): Promise<SignupResponse> => {
        return this.grpcCall(this.#_client.signup.bind(this.#_client), request);
    }

    resendOtp = async (
        request: ResendOtpRequest,
    ): Promise<ResendOtpResponse> => {
        return this.grpcCall(this.#_client.resendOtp.bind(this.#_client), request);
    }

    verifyOtp = async (
        request: VerifyOtpRequest,
    ): Promise<VerifyOtpResponse> => {
        return this.grpcCall(this.#_client.verifyOtp.bind(this.#_client), request);
    }

    login = async (
        request: LoginRequest,
    ): Promise<LoginResponse> => {
        return this.grpcCall(this.#_client.login.bind(this.#_client), request);
    }

    oAuthLogin = async (
        request: OAuthLoginRequest,
    ): Promise<OAuthLoginResponse> => {
        return this.grpcCall(this.#_client.oAuthLogin.bind(this.#_client), request);
    }

    forgotPassword = async (
        request: ForgotPasswordRequest,
    ): Promise<ForgotPasswordResponse> => {
        return this.grpcCall(this.#_client.forgotPassword.bind(this.#_client), request);
    }

    resetPassword = async (
        request: ResetPasswordRequest,
    ): Promise<ResetPasswordResponse> => {
        return this.grpcCall(this.#_client.resetPassword.bind(this.#_client), request);
    }

    refreshToken = async (
        request: RefreshTokenRequest,
    ): Promise<RefreshTokenResponse> => {
        return this.grpcCall(this.#_client.refreshToken.bind(this.#_client), request);
    }

    profile = async(
        request : UserProfileRequest,
    ) : Promise<UserProfileResponse> => {
        return this.grpcCall(this.#_client.profile.bind(this.#_client), request)
    }

    updateProfile = async(
        request : UpdateProfileRequest
    ) : Promise<UpdateProfileResponse> => {
        return this.grpcCall(this.#_client.updateProfile.bind(this.#_client), request)
    }

}

export default new GrpcUserService();