import { GetDashboardStatsRequest, GetDashboardStatsResponse, GetPreviousHintsRequest, GetPreviousHintsResponse, GetProblemSubmissionStatsResponse, ListProblemSpecificSubmissionRequest, ListProblemSpecificSubmissionResponse, ListTopKCountryLeaderboardRequest, ListTopKCountryLeaderboardResponse, ListTopKGlobalLeaderboardRequest, ListTopKGlobalLeaderboardResponse, RequestFullSolutionRequest, RequestFullSolutionResponse, RequestHintRequest, RequestHintResponse, SubmissionServiceClient } from "@akashcapro/codex-shared-utils/dist/proto/compiled/gateway/problem";
import { GrpcBaseService } from "../GrpcBaseService";
import { config } from "@/config";
import { credentials } from "@grpc/grpc-js";
import { Empty } from "@akashcapro/codex-shared-utils/dist/proto/compiled/google/protobuf/empty";
import fs from "fs";

const caCert = fs.readFileSync("/secrets/ca.pem");
const clientKey = fs.readFileSync("/secrets/gateway.key");
const clientCert = fs.readFileSync("/secrets/gateway.pem");

/**
 * Class implementing the submission grpc client call.
 * 
 * @class
 * @extends {GrpcBaseService}
 */
export class GrpcSubmissionService extends GrpcBaseService {

    #_client : SubmissionServiceClient

    constructor(){
        super();
        this.#_client = new SubmissionServiceClient(
            config.GRPC_PROBLEM_SERVICE_URL!,
            credentials.createSsl(caCert, clientKey, clientCert)
        )
    }

    listProblemSpecificSubmission = async (
        request : ListProblemSpecificSubmissionRequest
    ) : Promise<ListProblemSpecificSubmissionResponse> => {
        return this.grpcCall(
            this.#_client.listProblemSpecificSubmission.bind(this.#_client),
            request
        )
    }

    listTopKGlobalLeaderboard = async (
        request : ListTopKGlobalLeaderboardRequest
    ) : Promise<ListTopKGlobalLeaderboardResponse> => {
        return this.grpcCall(
            this.#_client.listTopKGlobalLeaderboard.bind(this.#_client),
            request
        )
    }

    listTopKCountryLeaderboard = async (
        request : ListTopKCountryLeaderboardRequest
    ) : Promise<ListTopKCountryLeaderboardResponse> => {
        return this.grpcCall(
            this.#_client.listTopKCountryLeaderboard.bind(this.#_client),
            request
        )
    }

    getDashboardStats = async (
        request : GetDashboardStatsRequest
    ) : Promise<GetDashboardStatsResponse> => {
        return this.grpcCall(
            this.#_client.getDashboardStats.bind(this.#_client),
            request
        )
    }

    getProblemSubmissionStats = async () : Promise<GetProblemSubmissionStatsResponse> => {
        return this.grpcCall(
            this.#_client.getProblemSubmissionStats.bind(this.#_client),
            Empty
        )
    }

    getPreviousHints = async (
        request : GetPreviousHintsRequest
    ) : Promise<GetPreviousHintsResponse> => {
        return this.grpcCall(
            this.#_client.getPreviousHints.bind(this.#_client),
            request  
        )
    }

    requestHint = async (
        request : RequestHintRequest
    ) : Promise<RequestHintResponse> => {
        return this.grpcCall(
            this.#_client.requestHint.bind(this.#_client),
            request
        )   
    }

    requestFullSolution = async (
        request : RequestFullSolutionRequest
    ) : Promise<RequestFullSolutionResponse> => {
        return this.grpcCall(
            this.#_client.requestFullSolution.bind(this.#_client),
            request
        )
    }

}

export default new GrpcSubmissionService();