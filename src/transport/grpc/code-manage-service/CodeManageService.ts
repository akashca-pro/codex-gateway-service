import { 
    CodeManageServiceClient, 
    CustomCodeExecRequest, 
    CustomCodeExecResponse, 
    RunCodeExecRequest, 
    RunCodeExecResponse,  
    SubmitCodeExecRequest, 
    SubmitCodeExecResponse,

 } from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/code_manage";
import { GrpcBaseService } from "../GrpcBaseService";
import { config } from "@/config";
import { credentials } from "@grpc/grpc-js";
import fs from "fs";

const caCert = fs.readFileSync("/secrets/ca/ca.pem");
const clientKey = fs.readFileSync("/secrets/key/gateway.key");
const clientCert = fs.readFileSync("/secrets/cert/gateway.pem");


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
            config.GRPC_CODE_MANAGE_SERVICE_URL,
            credentials.createSsl(caCert, clientKey, clientCert)
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
    ) : Promise<RunCodeExecResponse> => {
        return this.grpcCall(
            this.#_client.runCodeExec.bind(this.#_client),
            request
        )
    }

    customCodeExec = async (
        request : CustomCodeExecRequest
    ) : Promise<CustomCodeExecResponse> => {
        return this.grpcCall(
            this.#_client.customCodeExec.bind(this.#_client),
            request
        )
    }
}

export default new GrpcCodeManageService();