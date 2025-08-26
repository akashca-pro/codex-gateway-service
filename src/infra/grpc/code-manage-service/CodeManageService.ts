import { CodeManageServiceClient, CustomCodeExecRequest, RunCodeExecRequest, SubmitCodeExecRequest, SubmitCodeExecResponse } from "@akashcapro/codex-shared-utils/dist/proto/compiled/internal/code_manage";
import { GrpcBaseService } from "../GrpcBaseService";
import { config } from "@/config";
import { credentials } from "@grpc/grpc-js";
import { Empty } from "@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty";


/**
 * Class implementing the code manage grpc client call.
 * 
 * @class
 * @extends {GrpcBaseService}
 */
class GrpcCodeManageService extends GrpcBaseService {

    #_client : CodeManageServiceClient

    constructor(){
        super();
        this.#_client = new CodeManageServiceClient(
            config.GRPC_PROBLEM_SERVICE_URL!,
            credentials.createInsecure()
        )
    }

    submitCodeExec = async (
        request : SubmitCodeExecRequest
    ) : Promise<SubmitCodeExecResponse> => {
        return this.grpcCall(
            this.#_client.submitCodeExec.bind(this.#_client),
            request
        );
    }

    runCodeExec = async (
        request : RunCodeExecRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.runCodeExec.bind(this.#_client),
            request
        )
    }

    customCodeExec = async (
        request : CustomCodeExecRequest
    ) : Promise<Empty> => {
        return this.grpcCall(
            this.#_client.customCodeExec.bind(this.#_client),
            request
        )
    }
}

export default new GrpcCodeManageService();