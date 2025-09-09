import { AdminProfileRequest, AdminProfileResponse, AuthAdminServiceClient, BlockUserRequest, ListUsersRequest, ListUsersResponse, LoginRequest, LoginResponse, RefreshTokenRequest, RefreshTokenResponse } from "@akashcapro/codex-shared-utils";
import { GrpcBaseService } from "../../GrpcBaseService";
import { config } from "@/config";
import { credentials } from "@grpc/grpc-js";
import { Empty } from "@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty";

/**
 * Class implementing the admin grpc client call.
 * 
 * @class
 * @extends {GrpcBaseService}
 */
class GrpcAdminService extends GrpcBaseService {

    #_client : AuthAdminServiceClient

    constructor(){
        super();
        this.#_client = new AuthAdminServiceClient(
            config.GRPC_AUTH_SERVER_URL!,
            credentials.createInsecure()
        );
    }

    login = async (
        request: LoginRequest,
    ): Promise<LoginResponse>  => {
        return this.grpcCall(this.#_client.login.bind(this.#_client), request);
    }

    refreshToken = async (
        request: RefreshTokenRequest,
    ): Promise<RefreshTokenResponse> => {
        return this.grpcCall(this.#_client.refreshToken.bind(this.#_client), request);
    }

    profile = async(
        request : AdminProfileRequest,
    ): Promise<AdminProfileResponse> => {
        return this.grpcCall(this.#_client.profile.bind(this.#_client), request)
    }

    listUsers = async(
        request : ListUsersRequest
    ): Promise<ListUsersResponse> => {
        return this.grpcCall(this.#_client.listUsers.bind(this.#_client), request)
    }

    BlockUser = async(
        request : BlockUserRequest
    ) : Promise<Empty> => {
        return this.grpcCall(this.#_client.blockUser.bind(this.#_client), request);
    }

}

export default new GrpcAdminService();