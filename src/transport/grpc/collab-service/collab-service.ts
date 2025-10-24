import {
    CreateSessionRequest,
    CreateSessionResponse,
    SessionManagerClient
} from '@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/collab'
import { GrpcBaseService } from "../GrpcBaseService";
import { config } from "@/config";
import { credentials } from "@grpc/grpc-js";

/**
 * Class implementing the collab service grpc client call.
 * 
 * @class
 * @extends {GrpcBaseService}
 */
export class GrpcCollabService extends GrpcBaseService {

    #_client : SessionManagerClient

    constructor(){
        super();
        this.#_client = new SessionManagerClient(
            config.GRPC_COLLAB_SERVICE_URL,
            credentials.createInsecure()
        )
    }

    createSession = async (
        request : CreateSessionRequest
    ) : Promise<CreateSessionResponse> => {
        return this.grpcCall(
            this.#_client.createSession.bind(this.#_client),
            request
        )
    }
} 

export default new GrpcCollabService();